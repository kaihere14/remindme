import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import User, { IUser } from "../models/user.models";

module.exports={
    data: new SlashCommandBuilder()
    .setName("google-clander")
    .setDescription("Link your google calender for direcly access your events"),
    async execute(interaction: ChatInputCommandInteraction){
        
        const userId= interaction.user.id;
        const user = await User.findOne({discordId: userId}) as IUser;
        if(user.calendarRefreshToken!=null){
            return interaction.reply({content: "You have already linked your google calender", ephemeral: true});
        }
        await interaction.reply({content: `https://remind-backend.armandev.space/api/google-calender?userId=${userId}`, ephemeral: true});
        
    }
}   