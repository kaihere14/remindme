import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import OpenAI from "openai";
import Reminder from "../models/reminder.model";
import User from "../models/user.models";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reminder")
    .setDescription("Sets a reminder for the user.")
    .addStringOption((option) =>
      option
        .setName("details")
        .setDescription("What is the task and when (once/daily/weekly)")
        .setRequired(true),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const input = interaction.options.getString("details", true);

    const user = await User.findOne({ discordId: interaction.user.id });
    if (!user) {
      await interaction.reply("❌ Please set your email first.");
      return;
    }
    const now = new Date().toISOString();

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
            You extract reminder information.

          IMPORTANT RULES:
          - Current datetime is: ${now}
          - Timezone: ${user.timezone}
          - NEVER return a past date
          - If the user mentions a date without a year, assume the NEXT future occurrence
          - If the time has already passed today, move it to the next valid day
          - Return ONLY valid JSON

          FORMAT:
          {
            "title": string,
            "remindAt": string (ISO 8601),
            "repeat": "none" | "daily" | "weekly"
          }
          `.trim(),
        },
        {
          role: "user",
          content: input,
        },
      ],
      temperature: 0,
    });

    let parsed;
    try {
      const content = response.choices[0].message
        .content!.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      parsed = JSON.parse(content);
    } catch (error) {
      console.log(error);
      await interaction.reply("❌ Failed to understand reminder details.");
      return;
    }

    const reminder = new Reminder({
      discordId: interaction.user.id,
      email: user.email,
      title: parsed.title,
      remindAt: new Date(parsed.remindAt),
      repeat: parsed.repeat,
      reminderSent: false,
      archived: false,
    });

    await reminder.save();
    await interaction.reply("✅ Reminder set successfully!");
  },
};
