import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import Reminder from '../models/reminder.model';

module.exports = {
    data: new SlashCommandBuilder()
    .setName("delete-reminder")
    .setDescription("Delete a reminder")
    .addStringOption(option => option.setName("reminder-title").setDescription("The title of the reminder to delete").setRequired(true)),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const reminderTitle = interaction.options.getString("reminder-title");
        const user = interaction.user;
        const reminder = await Reminder.findOne({ title: reminderTitle, discordId: user.id });
        if (!reminder) {
            await interaction.reply({
                content: "Reminder not found",
                ephemeral: true
            });
            return;
        }
        await reminder.deleteOne();
        await interaction.reply({
            content: "Reminder deleted",
            ephemeral: true
        });
    }
}