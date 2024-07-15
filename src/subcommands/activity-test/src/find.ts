import { ButtonKit, SlashCommandProps } from "commandkit";
import { getConfig } from "../../../config";
import { MActivityCheck } from '../../../schemas/activity-check';
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import { ActionRowBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder } from "discord.js";
import * as ms from '@lukeed/ms';

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});
   const config = getConfig(interaction);

   const id = interaction.options.getString("id");

   const document = await MActivityCheck.findOne({ID: id});
   if (!document) {
      await interaction.followUp({embeds: [getCommandFailedToRunEmbed("Activity Check not found.")]});
      return;
   }

   /**
    *    ID: string,
   buttonID: string,
   createdBy: Snowflake,
   deadline: string,
   employeesReacted: Array<Snowflake>,
    */

   const deadlineTimestamp = Math.floor((new Date(document.deadline).getTime())/1000);

   const activityCheckEmbed = new EmbedBuilder()
      .setTitle("Activity Check:")
      .addFields(
         {name: "ID", value: document.ID},
         {name: "Created by", value: `<@!${document.createdBy}>\n${(await interaction.guild?.members.fetch(document.createdBy))?.user?.username}`},
         {name: `Deadline`, value: `<t:${deadlineTimestamp}:f>`}
      )
      .setColor("DarkRed")

   const inactiveButton = new ButtonKit()
      .setLabel("Show inactive employees")
      .setStyle(ButtonStyle.Danger)
      .setCustomId((Date.now()).toString());
      
   const devInfoButton = new ButtonKit()
      .setLabel("Dev info")
      .setStyle(ButtonStyle.Primary)
      .setCustomId((Date.now()+1).toString());

   const mainRow = new ActionRowBuilder<ButtonKit>().setComponents([inactiveButton, devInfoButton]);
   
   const message = await interaction.followUp({embeds: [activityCheckEmbed], components: [mainRow], fetchReply: true});

   inactiveButton.onClick(
      async (subInteraction: ButtonInteraction) => {

      },
      {
         message: message,
         time: ms.parse("1m"),
      }
   )

   await interaction.guild?.members.fetch();

   devInfoButton.onClick(
      async (subInteraction: ButtonInteraction) => {
         const devInfoEmbed = new EmbedBuilder()
            .setFields(
               {name: "Doc ID", value: document.id},
               {name: "ID", value: document.ID},
               {name: "buttonID", value: document.buttonID},
               {name: "createdBy", value: document.createdBy},
               {name: "Deadline", value: document.deadline + "\n" + `(${new Date(document.deadline).getTime()})`}
            )
            .setColor("Blurple")
         const plainReactedMembersButton = new ButtonKit()
            .setLabel("Plain reacted employees")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId((Date.now()+2).toString());
         
         const devInfoMessage = await subInteraction.reply({
            ephemeral: true,
            embeds: [devInfoEmbed],
            components: [new ActionRowBuilder<ButtonKit>({components: [plainReactedMembersButton]})],
            fetchReply: true});
         
         plainReactedMembersButton.onClick(
            async (subSubInteraction: ButtonInteraction) => {
               let reactedMembersString = "";
               for (const memberID of document.employeesReacted) {
                  let username = interaction.guild?.members.cache.get(memberID)?.user.username ?? "No username found";
                  reactedMembersString += `<@!${memberID}> (${username})\n`;
               }
               const plainReactedMembersEmbed = new EmbedBuilder()
                  .setDescription(reactedMembersString)
                  .setColor("Grey");
               await subSubInteraction.reply({ephemeral: true, embeds: [plainReactedMembersEmbed]});
            },
            {
               message: devInfoMessage,
               time: ms.parse("1m"),
            }
         )

      },
      {
         message: message,
         time: ms.parse("1m")
      }
   )
}