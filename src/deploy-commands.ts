import { REST, Routes } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

const commands = [];
const clientId = process.env.clientId;
const guildId = process.env.guildId;
const token = process.env.DISCORD_BOT_TOKEN;

// Grab all the command files from the commands directory
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
    );
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token as string);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );
    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId as string, guildId as string),
      { body: commands },
    );

    console.log(
      `Successfully reloaded ${(data as any).length} application (/) commands.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
