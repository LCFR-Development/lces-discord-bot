import { SlashCommandProps } from "commandkit";
import { EmbedBuilder, GuildMember } from "discord.js";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import axios from "axios";
import { RobloxUserFromUsername, RobloxUsernameAPIResponce } from "../../../types/RobloxUsernameApiResponce";
import { IEmployee, MEmployee } from "../../../schemas/employees/employee";
import { v4 as uuid } from 'uuid';
import { FDRanks } from "../../../config/ranks/fdRanks";
import { MFDEmployee } from "../../../schemas/employees/fdEmployee";
import getPrettyString from "../../../utils/getPrettyString";
import { getConfig } from "../../../config";
import getIsFDCallsignFree from "../../../utils/getIsFDCallsignFree";

export default async function({interaction, client}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});

   const config = getConfig(interaction);
   if (!config) return;

   const discordMember = interaction.options.getMember("discord") as GuildMember;
   const robloxUsername = interaction.options.getString("roblox") as string;
   const callsign = interaction.options.getString("callsign") as string;
   const rankInput = interaction.options.getString("rank") as string;

   try {
      const robloxUserAxiosResponse = await axios.post<RobloxUsernameAPIResponce>(
         `https://users.roblox.com/v1/usernames/users`,
         {
            "usernames": [robloxUsername],
            excludeBannedUsers: false
         },
         {
            responseType: "json"
         }
      );

      const robloxUser: RobloxUserFromUsername | undefined = robloxUserAxiosResponse.data.data.find(user => user.name === robloxUsername);
      if (!robloxUser) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("The user was not found on Roblox.")]});
         return;
      }

      const mainEmployeeDocument = await MEmployee.findOne({discordID: discordMember.id});
      const employeeID: string = mainEmployeeDocument?.ID ?? uuid();

      if (rankInput.startsWith("fd")) {
         if (mainEmployeeDocument?.departments.FD) {
            await interaction.editReply({embeds: [getCommandFailedToRunEmbed("This user is already an FD employee.")]});
            return;
         }

         if (!getIsFDCallsignFree(callsign)) {
            await interaction.editReply({embeds: [getCommandFailedToRunEmbed("The callsign is already in use.")]});
            return;
         }

         const rank: FDRanks = FDRanks[rankInput.slice(rankInput.indexOf("_") + 1) as keyof typeof FDRanks];
         if (!mainEmployeeDocument) {
            await MEmployee.create({
               ID: employeeID,
               discordID: discordMember.id,
               robloxID: robloxUser.id,
               departments: {FD: true, EMS: false, FM: false, FAVFD: false} as IEmployee["departments"],
            });
         } else {
            let departments = mainEmployeeDocument.departments;
            departments.FD = true;
            await MEmployee.updateOne({ID: mainEmployeeDocument.ID}, {$set: {departments}}); 
         }

         const fdEmployeeDocument = await MFDEmployee.create({
            ID: employeeID,
            callsign: callsign,
            rank: rank,
         });

         const replyEmbed = new EmbedBuilder()
         .setTitle(`Created employee:`)
         .setDescription(
            `Employee ID: ${fdEmployeeDocument.ID}\n` +
            `Callsign: ${fdEmployeeDocument.callsign}\n` +
            `Rank: ${getPrettyString(FDRanks[fdEmployeeDocument.rank])} (${FDRanks[fdEmployeeDocument.rank]})\n`
         )
         .setColor(config.colors.mainEmbedColor);

         await interaction.editReply({embeds: [replyEmbed]});
         return;
      }

      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("No division was found.")]});
   } catch (error) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("An error occured while creating the employee.")]});
   }

} 