import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import Reminder from "../models/reminder.model";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list-reminder")
    .setDescription("Lists all your active reminders"),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    try {
      const reminders = await Reminder.find({
        discordId: interaction.user.id,
        archived: false,
      }).sort({ remindAt: 1 });

      if (reminders.length === 0) {
        await interaction.editReply({
          content: "📭 You don't have any active reminders.",
        });
        return;
      }

      const embed = new EmbedBuilder()
        .setColor(0x5865f2)
        .setTitle("📋 Your Reminders")
        .setDescription(`You have **${reminders.length}** active reminder${reminders.length !== 1 ? "s" : ""}`)
        .setFooter({ text: `Requested by ${interaction.user.tag}` })
        .setTimestamp();

      reminders.forEach((reminder, index) => {
        const timestamp = Math.floor(reminder.remindAt.getTime() / 1000);
        const repeatBadge = reminder.repeat !== "none" ? `🔁 ${reminder.repeat}` : "🔔 once";
        const statusBadge = reminder.reminderSent ? "✅ Sent" : "⏳ Pending";

        embed.addFields({
          name: `${index + 1}. ${reminder.title}`,
          value: [
            `**When:** <t:${timestamp}:F> (<t:${timestamp}:R>)`,
            `**Type:** ${repeatBadge}`,
            `**Status:** ${statusBadge}`,
            `**Email:** ${reminder.email}`,
          ].join("\n"),
          inline: false,
        });
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching reminders:", error);
      await interaction.editReply({
        content: "❌ Failed to fetch your reminders. Please try again later.",
      });
    }
  },
};