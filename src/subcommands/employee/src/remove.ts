import { SlashCommandProps } from "commandkit";
import getMessageLoadingEmbed from "../../../utils/getMessageLoadingEmbed";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import { MEmployee } from "../../../schemas/employees/employee";
import { EmbedBuilder } from "discord.js";
import { RobloxUserFromID } from "../../../types/RobloxUserFromID";
import axios from "axios";
import botConfig from "../../../config/botConfig";

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});
   await interaction.editReply({embeds: [getMessageLoadingEmbed("Finding employee...")]});

   const id = interaction.options.getString("id");
   const employee = interaction.options.getUser("employee");

   if (!id && !employee) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("No employee provided.")]});
      return;
   }

   const document = id ? await MEmployee.findOne({ID: id}) : await MEmployee.findOne({discordID: employee!.id});
   if (!document) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("No employee found.")]});
      return;
   }

   await interaction.editReply({embeds: [getMessageLoadingEmbed("Removing employee...")]});
   try {
      const robloxUser = (await axios.get<RobloxUserFromID>(`https://users.roblox.com/v1/users/${document.robloxID}`)).data;

      const mainEmbed = new EmbedBuilder()
         .setTitle("Employee removed")
         .setDescription(
            `**Employee ID:** ${document.ID}\n`+
            `**Roblox user:** ${robloxUser.name} (${document.robloxID})\n`+
            `**Discord user:** <@${document.discordID}> (${(await interaction.guild?.members.fetch(document.discordID))?.user?.username})\n`+
            `**Departments:**\n` + 
            `${botConfig.emojis.empty} FD: ${document.departments.FD}\n`
         )
         .setColor("Red");
      
      await document.deleteOne();

      await interaction.editReply({embeds: [mainEmbed]});
   } catch (error) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed(`There was an error while executing this command.`)]});
      return;
   }
}
