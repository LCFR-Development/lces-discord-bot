import { Channel, EmbedBuilder, GuildMember, SlashCommandBuilder, Snowflake, StringMappedInteractionTypes } from "discord.js";

import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";
import getMessageLoadingEmbed from "../../utils/getMessageLoadingEmbed";
import { MEmployee } from "../../schemas/employees/employee";
import getCommandFailedToRunEmbed from "../../utils/getCommandFailedToRunEmbed";
import { getConfig, instanceOfFDConfig } from "../../config";
import { MFDEmployee } from "../../schemas/employees/fdEmployee";
import { FDRanks, getFDRankFromDBAsEnum } from '../../config/ranks/fdRanks';
import getCommandSuccessEmbed from "../../utils/getCommandSuccessEmbed";
import getPrettyString from "../../utils/getPrettyString";

function getMainEmbedDescription(employee: GuildMember, rankBefore: string, rankAfter: string, reason: string) {
   const res: string = 
      `**Employee:** ${employee.user} (${employee.user.username})\n` +
      `**Rank before:** ${getPrettyString(rankBefore)}\n` +
      `**Rank after:** ${getPrettyString(rankAfter)}\n` +
      `**Reason:** ${reason}`;

   return res;
}

function getDMEmbedDescription(promotionsChannelID: Snowflake, deptName: string) {
   const res: string =
      `You have been promoted in ${deptName}!\n` + 
      `Check <#${promotionsChannelID}> for more information.`;
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

   const promotionsChannel = await client.channels.fetch(config.channels.promotions) as Channel;
   if (!promotionsChannel.isTextBased()) {
      return;
   }

   const employeeMainDocument = await MEmployee.findOne({discordID: employee.user.id});
   if (!employeeMainDocument) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Employee not found.")]});
      return;
   }

   const highCommandEmployeeDocument = await MEmployee.findOne({discordID: interaction.user.id});
   if (!highCommandEmployeeDocument) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("You are not in the database.")]});
      return;
   }

   const mainEmbed = new EmbedBuilder();
   const dmEmbed = new EmbedBuilder();

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

      const highCommandFDDocument = await MFDEmployee.findOne({ID: highCommandEmployeeDocument.ID});
      if (!highCommandFDDocument) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("You are not in FD!")]});
         return;
      }
     
      if (highCommandEmployeeDocument.ID === employeeMainDocument.ID) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("You cannot promote yourself.")]});
         return;
      }

      if (FDEmployeeDocument.rank >= highCommandFDDocument.rank) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("This person is higher/equal to you.")]});
         return;
      }

      const rankAfterPlain = rankAfter.slice(rankAfter.indexOf("_") + 1);

      const rankAfterEnum: FDRanks | undefined = FDRanks[rankAfterPlain as keyof typeof FDRanks];
      const rankBeforeEnum: FDRanks | undefined = getFDRankFromDBAsEnum(FDEmployeeDocument.rank);
      if (rankAfterEnum === undefined) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Invalid rank.")]});
         return;
      }
      if (rankBeforeEnum === undefined) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("There was an error while executing this command.")]});
         return;
      }
      
      if (rankAfterEnum <= rankBeforeEnum) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("The rank after is lower than the rank before.")]});
         return;
      }

      if (rankAfterEnum >= highCommandFDDocument.rank) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("You cannot promote someone to a higher rank than you.")]});
         return;
      }

      await interaction.editReply({embeds: [getMessageLoadingEmbed("Promoting the employee...")]});

      await FDEmployeeDocument.updateOne({$set: {rank: rankAfterEnum}});

      mainEmbed.setTitle(`${config.texts.deptName} | Promotion `);
      mainEmbed.setDescription(getMainEmbedDescription(employee, FDRanks[rankBeforeEnum], FDRanks[rankAfterEnum], reason));
      mainEmbed.setColor(config.colors.mainEmbedColor);

      dmEmbed.setDescription(getDMEmbedDescription(promotionsChannel.id, config.texts.deptName));
      dmEmbed.setColor(config.colors.mainEmbedColor);

      await promotionsChannel.send({content: `<@!${employee.user.id}>`, embeds: [mainEmbed]});
      await employee.user.send({embeds: [dmEmbed]}).catch(() => {});
      await FDEmployeeDocument.updateOne({$set: {rank: rankAfterEnum}});

      await interaction.editReply({embeds: [getCommandSuccessEmbed()]});

      return;
   }
   
   await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Division not found.")]});
}

export const options: CustomCommandOptions = {
}