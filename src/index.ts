import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

import express, { Request, Response } from "express";
import { runCronJob } from "./utils/cron.jobs";
import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import connectDB from "./utils/connectDb";

const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
  console.error("No token provided");
  process.exit(1);
}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
(client as any).commands = new Collection();

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

  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    (client as any).commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
    );
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = (interaction.client as any).commands.get(
    interaction.commandName,
  );

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

// Log in to Discord with your client's token
connectDB()
  .then(async () => {
    client.login(token);

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.get("/", (req: Request, res: Response) => {
      res.send("RemindMe Bot is running");
    });

    app.get("/api/cron", async (req: Request, res: Response) => {
      try {
        await runCronJob();
        res.status(200).send("Cron job executed successfully");
      } catch (error) {
        console.error("Error triggering cron job:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
