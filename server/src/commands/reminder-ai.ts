import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import OpenAI from "openai";
import Reminder from "../models/reminder.model";
import User from "../models/user.models";
import { calendar_v3, google } from "googleapis";
import { getAuthClient } from "../utils/calenderLink";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reminder-ai")
    .setDescription("Sets a reminder for the user.")
    .addStringOption((option) =>
      option
        .setName("details")
        .setDescription("What is the task and when (once/daily/weekly)")
        .setRequired(true),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    // 🔑 MUST BE FIRST
    await interaction.deferReply({ flags: 64 });

    try {
      const input = interaction.options.getString("details", true);

      const user = await User.findOne({ discordId: interaction.user.id });
      if (!user) {
        await interaction.editReply("❌ Please set your email first.");
        return;
      }

      const now = new Date().toISOString();

      const response = await client.chat.completions.create({
        model: "openai/gpt-oss-120b",
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
      let calendarEventId: string | null | undefined = null;

      try {
        const content = response.choices[0].message.content!
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        parsed = JSON.parse(content);
      } catch (err) {
        console.error(err);
        await interaction.editReply("❌ Failed to understand reminder details.");
        return;
      }

      // 📅 Google Calendar
      if (user.calendarEventsEnabled && user.calendarRefreshToken) {
        try {
          const auth = await getAuthClient(user.calendarRefreshToken);
          const calendar = google.calendar({ version: "v3", auth });

          const startDate = new Date(parsed.remindAt);
          if (isNaN(startDate.getTime())) {
            throw new Error("Invalid remindAt date");
          }

          const endDate = new Date(startDate.getTime() + 10 * 60 * 1000);

          const event: calendar_v3.Schema$Event = {
            summary: parsed.title,
            description: "Created automatically via RemindMe Discord Bot",
            start: {
              dateTime: startDate.toISOString(),
              timeZone: user.timezone,
            },
            end: {
              dateTime: endDate.toISOString(),
              timeZone: user.timezone,
            },
          };

          const res = await calendar.events.insert({
            calendarId: "primary",
            requestBody: event,
          });

          calendarEventId = res.data?.id;
        } catch (err: any) {
          console.error("Google Calendar error:", err?.message);
        }
      }

      const reminder = new Reminder({
        discordId: interaction.user.id,
        email: user.email,
        title: parsed.title,
        remindAt: new Date(parsed.remindAt),
        repeat: parsed.repeat,
        reminderSent: false,
        archived: false,
        calendarEventId,
      });

      await reminder.save();

      await interaction.editReply({
        content: `✅ **Reminder set!**

📝 **Title:** ${reminder.title}
⏰ **Time:** <t:${Math.floor(reminder.remindAt.getTime() / 1000)}:F>
🔁 **Repeat:** ${reminder.repeat}`,
      });
    } catch (err) {
      console.error(err);
      await interaction.editReply("❌ Something went wrong while creating the reminder.");
    }
  },
};
