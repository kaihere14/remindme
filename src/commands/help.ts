import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get help with the bot"),
  async execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle("📚 RemindMe Bot - Help")
      .setDescription("Here are all the available commands:")
      .addFields(
        {
          name: "/email",
          value: "Set your email address for receiving reminders",
          inline: false,
        },
        {
          name: "/change-email",
          value: "Update your email address",
          inline: false,
        },
        {
          name: "/reminder",
          value: "Create a new reminder (once/daily/weekly)",
          inline: false,
        },
        {
          name: "/delete-reminder",
          value: "Delete an existing reminder",
          inline: false,
        },
        {
          name: "/list-reminder",
          value: "View all your active reminders",
          inline: false,
        },
        {
          name: "/profile",
          value: "View your profile and reminder statistics",
          inline: false,
        },
        { name: "/help", value: "Show this help message", inline: false },
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
