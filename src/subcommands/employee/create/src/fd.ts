import { SlashCommandProps } from "commandkit";
import getMessageLoadingEmbed from "../../../../utils/getMessageLoadingEmbed";
import { getConfig } from "../../../../config";

import axios from "axios";
import { EmbedBuilder, User } from "discord.js";
import { RobloxUserFromUsername, RobloxUsernameAPIResponce } from "../../../../types/RobloxUsernameApiResponce";
import getCommandFailedToRunEmbed from "../../../../utils/getCommandFailedToRunEmbed";
import { IFDEmployee, MFDEmployee } from "../../../../schemas/employees/fdEmployee";
import { IEmployee, MEmployee } from "../../../../schemas/employees/employee";
import { v4 as uuid } from 'uuid';
import getIsFDCallsignFree from "../../../../utils/getIsFDCallsignFree";
import { FDRanks, FMRanks } from "../../../../config/fdRanks";

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});

   const user: User = interaction.options.getUser("discord") as User;
   const robloxUsername: string = interaction.options.getString("roblox") as string;
   const callsign: string = interaction.options.getString("callsign") as string;
   const rankInput: string = interaction.options.getString("rank") as string;

   const rank: FDRanks = FDRanks[rankInput as keyof typeof FDRanks];

   const config = getConfig(interaction);
   if (!config) return;

   await interaction.editReply({embeds: [getMessageLoadingEmbed("Creating the employee...", config)]});

   try {

      if (!(await getIsFDCallsignFree(callsign))) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("The callsign is already in use.")]});
         return;
      }

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
      
      const mainEmployeeDocument = await MEmployee.findOne({discordID: user.id});
      const employeeID: string = mainEmployeeDocument?.ID ?? uuid();
      if (!mainEmployeeDocument) {
         await MEmployee.create({
            ID: employeeID,
            discordID: user.id,
            robloxID: robloxUser.id,
            departments: {FD: true, EMS: false} as IEmployee["departments"],
         });
      }
      
      if (mainEmployeeDocument?.departments.FD) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("This user is already a FD employee.")]});
         return;
      }

      const fdEmployeeDocument = await MFDEmployee.create({
         ID: employeeID,
         callsign: callsign,
         rank: rank,
      });

      if (!fdEmployeeDocument.fmRank) return;

      const replyEmbed = new EmbedBuilder()
         .setTitle(`Created employee:`)
         .setDescription(
            `Employee ID: ${fdEmployeeDocument.ID}\n` +
            `Callsign: ${fdEmployeeDocument.callsign}\n` +
            `Rank: ${FDRanks[fdEmployeeDocument.rank]}\n` +
            `FM Rank: ${FMRanks[fdEmployeeDocument.fmRank]}`
         )
         .setColor(0x9e0000);

      await interaction.editReply({embeds: [replyEmbed]});
   } catch (error) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("An error occured while creating the employee.")]});
   }
}