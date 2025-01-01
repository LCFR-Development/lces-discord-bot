import { SlashCommandProps } from "commandkit";
import getMessageLoadingEmbed from "../../../utils/getMessageLoadingEmbed";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import { MEmployee } from "../../../schemas/employees/employee";
import { EmbedBuilder } from "discord.js";
import { RobloxUserFromID } from "../../../types/RobloxUserFromID";
import axios from "axios";
import botConfig from "../../../config/botConfig";
import { MFDEmployee } from "../../../schemas/employees/fdEmployee";
import getPrettyString from "../../../utils/getPrettyString";
import { FDRanks } from "../../../config/ranks/fdRanks";

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});
   await interaction.editReply({embeds: [getMessageLoadingEmbed("Finding employee...")]});

   const employee = interaction.options.getUser("employee");
   const division = interaction.options.getString("division");

   const document = await MEmployee.findOne({discordID: employee!.id, departments: {FD: true}});
   if (!document) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("No employee found.")]});
      return;
   }

   await interaction.editReply({embeds: [getMessageLoadingEmbed("Removing employee...")]});
   try {
      const robloxUser = (await axios.get<RobloxUserFromID>(`https://users.roblox.com/v1/users/${document.robloxID}`)).data;
      
      let mainEmbed: EmbedBuilder;
      
      switch (division) {
        case "fd":
          const FDEmployeeDoc = await MFDEmployee.findOne({ID: document.ID});
          if (!FDEmployeeDoc) {
            const departments = document.departments;
            departments.FD = false;
            await document.updateOne({$set: {departments}});
            await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Database corrupted. Trying to fix...\nRe-run this command, if this message comes up again report it to a bot dev.")]});
            return;
          }
          mainEmbed = new EmbedBuilder()
           .setTitle(`${division} Employee removed`)
           .setDescription(
              `**Employee ID:** ${document.ID}\n`+
              `**Roblox user:** ${robloxUser.name} (${document.robloxID})\n`+
              `**Discord user:** <@${document.discordID}> (${(await interaction.guild?.members.fetch(document.discordID))?.user?.username})\n`+
              `**Callsign:** ${FDEmployeeDoc.callsign}\n`+
              `**Rank:** ${getPrettyString(FDRanks[FDEmployeeDoc.rank])} (${FDRanks[FDEmployeeDoc.rank]})`
           )
           .setColor("Red");
          
          await FDEmployeeDoc.deleteOne();
          const departments = document.departments;
          departments.FD = false;
          await document.updateOne({$set: {departments}});
          
        break;
        default:
          mainEmbed = getCommandFailedToRunEmbed("Division not found.")
      }

      await interaction.editReply({embeds: [mainEmbed]});
   } catch (error) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed(`There was an error while executing this command.`)]});
      return;
   }
}
