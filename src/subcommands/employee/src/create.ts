import { SlashCommandProps } from "commandkit";
import { ColorResolvable, EmbedBuilder, GuildMember, Interaction } from "discord.js";
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

export type DeptFunctionProps = {mainEmployeeDocument: IEmployee, rankPlain: string, interaction: Interaction, commandInputs: {discordMember: GuildMember, robloxUser: RobloxUserFromUsername, callsign: string}}

function getResponseEmbed(employeeID: string, callsign: string, rank: {pretty: string, raw: string}, embedColor: ColorResolvable) {
  return new EmbedBuilder()
  .setTitle(`Created employee:`)
  .setDescription(
    `Employee ID: ${employeeID}\n` +
    `Callsign: ${callsign}\n` +
    `Rank: ${rank.pretty} (${rank.raw})\n`
  )
  .setColor(embedColor);
}

export default async function({interaction}: SlashCommandProps) {
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

      let mainEmployeeDocument = await MEmployee.findOne({discordID: discordMember.id});
      const employeeID: string = mainEmployeeDocument?.ID ?? uuid();

      mainEmployeeDocument ??= await MEmployee.create({
         ID: employeeID,
         discordID: discordMember.id,
         robloxID: robloxUser.id,
         departments: {FD: false} as IEmployee["departments"],
      });

      const rankPlain: string = rankInput.slice(rankInput.indexOf("_") + 1);

      if (rankInput.startsWith("fd")) {
        if (mainEmployeeDocument?.departments.FD) {
          await interaction.editReply({embeds: [getCommandFailedToRunEmbed("This user is already an FD employee.")]});
          return;
        }

        if (!getIsFDCallsignFree(callsign)) {
          await interaction.editReply({embeds: [getCommandFailedToRunEmbed("The callsign is already in use.")]});
          return;
        }

        const rank: FDRanks = FDRanks[rankPlain as keyof typeof FDRanks];
        const departments = mainEmployeeDocument.departments;
        departments.FD = true;
        await MEmployee.updateOne({ID: mainEmployeeDocument.ID}, {$set: {departments}}); 

        const fdEmployeeDocument = await MFDEmployee.create({
          ID: employeeID,
          callsign: callsign,
          rank: rank,
        });

        await interaction.editReply({embeds: [getResponseEmbed(
          mainEmployeeDocument.ID,
          fdEmployeeDocument.callsign,
          {
            pretty: getPrettyString(FDRanks[fdEmployeeDocument.rank]),
            raw: FDRanks[fdEmployeeDocument.rank]
          },
          config.colors.mainEmbedColor
        )]});
        return;
      }

      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("No division was found.")]});
   } catch (error) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("An error occured while creating the employee.")]});
   }

} 
