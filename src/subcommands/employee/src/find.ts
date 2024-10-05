import { SlashCommandProps } from "commandkit";
import getMessageLoadingEmbed from "../../../utils/getMessageLoadingEmbed";
import { getConfig, instanceOfFDConfig } from "../../../config";
import {   EmbedBuilder, GuildMember } from "discord.js";
import { MFDEmployee } from "../../../schemas/employees/fdEmployee";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import {  MEmployee } from "../../../schemas/employees/employee";
import axios from "axios";
import { RobloxUserFromID } from "../../../types/RobloxUserFromID";
import getPrettyString from "../../../utils/getPrettyString";
import { FDRanks } from "../../../config/ranks/fdRanks";

import botConfig from "../../../config/botConfig";

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});
   await interaction.editReply({embeds: [getMessageLoadingEmbed("Finding employee...")]});

   if (!interaction.inCachedGuild()) return;

   const employee = interaction.options.getMember("employee") as GuildMember;
   const division = interaction.options.getString("division") as string;

   const config = getConfig(interaction);
   if (!config) return;

   const mainEmbed = new EmbedBuilder();

   try {
      const mainEmployee = await MEmployee.findOne({discordID: employee.user.id});
      if (!mainEmployee) {
        await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Employee not found.")]})
        return;
      }

      const discordMember = await interaction.guild.members.fetch(mainEmployee.discordID);
      const robloxMemberApiResponce = await axios.get<RobloxUserFromID>(`https://users.roblox.com/v1/users/${mainEmployee.robloxID}`);

      const robloxMember: RobloxUserFromID = robloxMemberApiResponce.data;

      mainEmbed.setTitle(`${robloxMember.name}`);
      mainEmbed.setColor(config.colors.mainEmbedColor);

      if (instanceOfFDConfig(config)) {
         if (division === "fd") {
            const FDEmployee = await MFDEmployee.findOne({ID: mainEmployee.ID});
            if (!FDEmployee) {
               await interaction.editReply({embeds: [getCommandFailedToRunEmbed(`Could not find an employee.`)]});
               return;
            }
            mainEmbed.setDescription(
               `**Callsign:** ${FDEmployee.callsign}\n`+
               `**Discord user:** <@${mainEmployee.discordID}> (${discordMember.user.username})\n`+
               `**Roblox user:** ${robloxMember.name} (${mainEmployee.robloxID})\n`+
               `**Employee ID:** ${FDEmployee.ID}\n`+
               `**Rank:** ${getPrettyString(FDRanks[FDEmployee.rank])} (${FDRanks[FDEmployee.rank]})\n`+
               `**Sub-divisions:**\n` + 
               `${botConfig.emojis.empty} FM: ${mainEmployee.departments.FM}`
            );
         }
      }
   } catch (error) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed(`There was an error while executing this command.`)]});
      return;
   }

   await interaction.editReply({embeds: [mainEmbed]});
}
