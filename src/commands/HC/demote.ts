import { SlashCommandBuilder, Snowflake, GuildMember, Channel, EmbedBuilder } from "discord.js";

import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";
import { getConfig, instanceOfFDConfig} from "../../config";
import getCommandFailedToRunEmbed from "../../utils/getCommandFailedToRunEmbed.ts";
import getMessageLoadingEmbed from "../../utils/getMessageLoadingEmbed.ts";
import { MEmployee } from "../../schemas/employees/employee.ts";
import { MFDEmployee } from "../../schemas/employees/fdEmployee.ts";
import { FDRank, FDRanks, getFDRankFromDBAsEnum, getFDRankInfoFromDB } from "../../config/ranks/fdRanks.ts";
import getCommandSuccessEmbed from "../../utils/getCommandSuccessEmbed.ts";
import getPrettyString from "../../utils/getPrettyString.ts";
import { getFDRankInfo } from '../../config/ranks/fdRanks';
import { isSnowflake } from "discord-snowflake";

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
      `You have been demoted in ${deptName}!\n` + 
      `Check <#${promotionsChannelID}> for more information.`;
   return res;
}

export const data = new SlashCommandBuilder()
   .setName("demote")
   .setDescription("Demote an employee")
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

   const demotionsChannel = await client.channels.fetch(config.channels.demotions) as Channel;
   if (!demotionsChannel.isTextBased()) {
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
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("You cannot demote yourself.")]});
         return;
      }

      if (FDEmployeeDocument.rank >= highCommandFDDocument.rank) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("This person is higher/equal to you.")]});
         return;
      }

      const rankAfterPlain = rankAfter.slice(rankAfter.indexOf("_") + 1);

      const rankAfterObj: FDRank | undefined = getFDRankInfo(FDRanks[rankAfterPlain as keyof typeof FDRanks], config.guildID);
      const rankBeforeObj: FDRank | undefined = getFDRankInfoFromDB(FDEmployeeDocument.rank, config.guildID);
      if (rankAfterObj === undefined) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("Invalid rank.")]});
         return;
      }
      if (rankBeforeObj === undefined) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("There was an error while executing this command.")]});
         return;
      }

      if (rankAfterObj.rank >= rankBeforeObj.rank) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("The rank after is higher than the rank before.")]});
         return;
      }
      
      if ( !isSnowflake(rankAfterObj.rankID) || !isSnowflake(rankBeforeObj.rankID) || !isSnowflake(rankAfterObj.rankCategoryID) || !isSnowflake(rankBeforeObj.rankCategoryID)) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed("There was an error while executing this command.")]});
         return;
      }

      await interaction.editReply({embeds: [getMessageLoadingEmbed("Demoting the employee...")]});

      await FDEmployeeDocument.updateOne({$set: {rank: rankAfterObj.rank}});

      mainEmbed.setTitle(`${config.texts.deptName} | Demotion `);
      mainEmbed.setDescription(getMainEmbedDescription(employee, FDRanks[rankBeforeObj.rank], FDRanks[rankAfterObj.rank], reason));
      mainEmbed.setColor(config.colors.mainEmbedColor);

      dmEmbed.setDescription(getDMEmbedDescription(demotionsChannel.id, config.texts.deptName));
      dmEmbed.setColor(config.colors.mainEmbedColor);

      await demotionsChannel.send({content: `<@!${employee.user.id}>`, embeds: [mainEmbed]});
      await employee.user.send({embeds: [dmEmbed]}).catch(() => {});

      await employee.roles.remove(rankBeforeObj.rankID);
      await employee.roles.add(rankAfterObj.rankID);
      if (rankAfterObj.rankCategoryID !== rankBeforeObj.rankCategoryID) {
         await employee.roles.remove(rankBeforeObj.rankCategoryID);
         await employee.roles.add(rankAfterObj.rankCategoryID);
      }

      await FDEmployeeDocument.updateOne({$set: {rank: rankAfterObj.rank}});

      await interaction.editReply({embeds: [getCommandSuccessEmbed()]});

      return;
   }
}

export const options: CustomCommandOptions = {
}
