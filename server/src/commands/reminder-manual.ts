import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import Reminder from "../models/reminder.model";
import User from "../models/user.models";
import * as chrono from "chrono-node";


module.exports = {
  data: new SlashCommandBuilder()
    .setName("reminder-manual")
    .setDescription("Sets a reminder manually for the user.")
    .addStringOption(option =>
      option
        .setName("title")
        .setDescription("What is the reminder for?")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("time")
        .setDescription("When? (e.g. 'tomorrow 8pm', 'in 2 hours')")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("repeat")
        .setDescription("Repeat frequency")
        .setRequired(true)
        .addChoices(
          { name: "none", value: "none" },
          { name: "daily", value: "daily" },
          { name: "weekly", value: "weekly" }
        )
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const title = interaction.options.getString("title", true);
    const timeInput = interaction.options.getString("time", true);
    const repeat = interaction.options.getString("repeat", true) as
      | "none"
      | "daily"
      | "weekly";

    const parsedDate = chrono.parseDate(timeInput, new Date(), {
      forwardDate: true,
    });

    if (!parsedDate) {
      await interaction.reply({
        content: "❌ Couldn't understand the time. Try `tomorrow 8pm` or `in 2 hours`.",
        ephemeral: true,
      });
      return;
    }

    const user = await User.findOne({ discordId: interaction.user.id });
    if (!user) {
      await interaction.reply({
        content: "❌ Please set your email first.",
        ephemeral: true,
      });
      return;
    }

    await Reminder.create({
      discordId: interaction.user.id,
      email: user.email,
      title,
      remindAt: parsedDate,
      repeat,
    });

    await interaction.reply({
      content: `✅ **Reminder set!**\n\n📝 **Title:** ${title}\n⏰ **Time:** <t:${Math.floor(parsedDate.getTime() / 1000)}:F>\n🔁 **Repeat:** ${repeat}`,
      ephemeral: true,
    });
  },
};
