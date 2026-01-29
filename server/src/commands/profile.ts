import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import User from "../models/user.models";
import Reminder from "../models/reminder.model";



module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("View your profile"),
    async execute (interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ ephemeral: true });

        const user = await User.findOne({ discordId: interaction.user.id });
        const reminders = await Reminder.find({ discordId: interaction.user.id }).sort({ createdAt: -1 });
        if (!user) {
            await interaction.editReply("❌ Please set your email first.");
            return;
        }
        const embed = new EmbedBuilder()
            .setColor(0x5865f2)
            .setTitle("Profile")
            .addFields(
                { name: "Email", value: user.email },
                {name:"Google Calender", value: user.calendarRefreshToken ? "Linked" : "Not Linked"},
                { name: "Timezone", value: user.timezone },
                { name: "Reminders", value: reminders.length.toString() },
                {name:"Recent Reminders", value: reminders.slice(0, 5).map((reminder,index) => `${index+1}. ${reminder.title}`).join("\n")},
                {name:"Joined", value: user.createdAt.toDateString()}
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
    },
};