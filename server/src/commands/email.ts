import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import User from "../models/user.models";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("email")
    .setDescription("Sets the email for the user.")
    .addStringOption(option =>
      option
        .setName("email")
        .setDescription("Your email address")
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const email = interaction.options.getString("email", true);

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return interaction.reply({
        content: "Invalid email format ❌",
        ephemeral: true,
      });
    }

    const existedUser = await User.findOne({
      discordId: interaction.user.id,
    });

    if (existedUser) {
      return interaction.reply({
        content: "Email already set!",
        ephemeral: true,
      });
    }

    const user = new User({
      discordId: interaction.user.id,
      email,
      timezone: "Asia/Kolkata", // TEMP default — ask user later
      remindersEnabled: true,
    });

    await user.save();

    await interaction.reply({
      content: "Email set successfully ✅",
      ephemeral: true,
    });
  },
};
