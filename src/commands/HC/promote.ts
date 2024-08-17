import { EmbedBuilder, GuildMember, SlashCommandBuilder, Snowflake, StringMappedInteractionTypes } from "discord.js";

import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";
import getMessageLoadingEmbed from "../../utils/getMessageLoadingEmbed";
import { MEmployee } from "../../schemas/employees/employee";
import getCommandFailedToRunEmbed from "../../utils/getCommandFailedToRunEmbed";
import { getConfig, instanceOfFDConfig } from "../../config";
import { MFDEmployee } from "../../schemas/employees/fdEmployee";

function getMainEmbedDescription(employee: GuildMember, rankBefore: string, rankAfter: string, reason: string) {
   const res: string = 
      `**Employee:** ${employee.user} (${employee.user.username})\n` +
      `**Rank before:** ${rankBefore}\n` +
      `**Rank after:** ${rankAfter}\n` +
      `**Reason:** ${reason}`;

   return res;
}

export const data = new SlashCommandBuilder()
   .setName("promote")
   .setDescription("Promote an employee")
   .addUserOption(o => o
      .setName("employee")
      .setDescription("The employee to promote.")
      .setRequired(true)
   )
   .addStringOption(o => o
      .setName("reason")
      .setDescription("The reason of the promotion.")
      .setRequired(true)
   )
   .addStringOption(o => o
      .setName("rank-after")
      .setDescription("Rank after the promotion.")
      .setRequired(true)
      .setAutocomplete(true)
   )

export async function run({interaction, client}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});
   await interaction.editReply({embeds: [getMessageLoadingEmbed("Getting user information...")]});
   
   const config = getConfig(interaction);
   if (!config) return;

   const employee = interaction.options.getMember("employee") as GuildMember;
   const reason = interaction.options.getString("reason") as string;
   const rankAfter = interaction.options.getString("rank-after") as string;

   const employeeMainDocument = await MEmployee.findOne({discordID: employee.user.id});
   if (!employee) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Employee not found.")]});
   }

   const mainEmbed = new EmbedBuilder();

   if (rankAfter.startsWith("fd")) {
      if (!instanceOfFDConfig(config)) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("This division does not exist in this server.")]});
         return;
      }

      const FDEmployeeDocument = await MFDEmployee.findOne({ID: employeeMainDocument?.ID});
      if (!FDEmployeeDocument) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("This employee is not in FD!")]});
         return;
      }


   }
   
}

export const options: CustomCommandOptions = {
}
