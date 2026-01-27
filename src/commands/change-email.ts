import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import User from '../models/user.models';
import Reminder, { IReminder } from '../models/reminder.model';


module.exports = {
    data: new SlashCommandBuilder()
        .setName("change-email")
        .setDescription("Change your email")
        .addStringOption(option => option.setName("email").setDescription("Your email").setRequired(true)),
    async execute (interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ ephemeral: true });

        const user = await User.findOneAndUpdate({ discordId: interaction.user.id }, { email: interaction.options.getString("email") });
        if (!user) {
            await interaction.editReply("❌ Please set your email first.");
            return;
        }
        const reminders = await Reminder.find({ discordId: interaction.user.id });
        for(let i = 0 ;i<reminders.length;i++){
            //update email in all reminders
            (reminders[i].email as any) = interaction.options.getString("email");
            await reminders[i].save();
        }
        const embed = new EmbedBuilder()
            .setColor(0x5865f2)
            .setTitle("Profile")
            .setDescription(`Email changed successfully to ${interaction.options.getString("email")}`)
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
    },
};
