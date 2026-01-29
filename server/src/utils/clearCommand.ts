import { REST, Routes } from "discord.js";
import "dotenv/config";

const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.clientId;

if (!token || !clientId) {
  console.error("❌ Missing DISCORD_BOT_TOKEN or CLIENT_ID");
  process.exit(1);
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("🧹 Deleting ALL GLOBAL slash commands...");

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: [] } // 🔥 THIS deletes everything global
    );

    console.log("✅ All GLOBAL commands deleted");
    console.log("⏳ Discord may take up to 1 hour to fully reflect changes");
  } catch (error) {
    console.error("❌ Failed to delete global commands", error);
  }
})();
