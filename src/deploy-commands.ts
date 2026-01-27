import { REST, Routes } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

const commands = [];
const clientId = process.env.clientId;
const token = process.env.DISCORD_BOT_TOKEN;

if (!clientId || !token) {
  console.error("Missing clientId or DISCORD_BOT_TOKEN in .env file");
  process.exit(1);
}

// Grab all the command files from the commands directory
const commandsPath = path.join(__dirname, "commands");

// Support both .ts (dev) and .js (production) files
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  let command = require(filePath);

  // Support both module.exports and export default
  if (command.default) {
    command = command.default;
  }

  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
    );
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// Deploy commands GLOBALLY
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} GLOBAL application (/) commands.`,
    );

    // Register commands globally (not guild-specific)
    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${(data as any).length} GLOBAL application (/) commands.`,
    );
    console.log(
      `⚠️  Note: Global commands may take up to 1 hour to propagate across all Discord servers.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
