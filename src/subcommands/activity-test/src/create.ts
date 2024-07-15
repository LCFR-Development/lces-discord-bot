import { ButtonKit, SlashCommandProps } from "commandkit";

import { getConfig, IConfig } from "../../../config";
import { ActionRowBuilder, EmbedBuilder } from "@discordjs/builders";
import { ButtonInteraction, ButtonStyle, Colors, Snowflake } from "discord.js";
import * as ms from '@lukeed/ms';
import getCommandSuccessEmbed from "../../../utils/getCommandSuccessEmbed";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import { IActivityCheck, MActivityCheck, SActivityCheck } from '../../../schemas/activity-check';
import { v4 as uuid } from 'uuid';
import createDisabledButtonFromButtonKit from "../../../utils/createDisabledButtonFromButtonKit";
import getMessageLoadingEmbed from "../../../utils/getMessageLoadingEmbed";

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});
   const config = getConfig(interaction) as IConfig;

   if (!interaction.inCachedGuild()) return;

   await interaction.editReply({embeds: [getMessageLoadingEmbed("Preparing activity check...", config)]});

   for (const [,member] of (await interaction.guild.roles.fetch(config.roles.reactedToActivityTest))!.members) {
      if (member.roles.cache.has(config.roles.reactedToActivityTest)) {
         member.roles.remove(config.roles.reactedToActivityTest);
      }
   }

   const time: string = interaction.options.getString("time") as string;
   const timeMS = ms.parse(time);

   if (timeMS === undefined) {
      await interaction.editReply({content: "", embeds: [getCommandFailedToRunEmbed("The time you provided is invalid.")]});
      return;
   }

   const activeButtonCustomID = uuid();

   const activeButton = new ButtonKit()
      .setLabel("I'm active!")
      .setStyle(ButtonStyle.Success)
      .setCustomId(activeButtonCustomID);

   const row = new ActionRowBuilder<ButtonKit>().setComponents(activeButton);

   
   const activityTestID = uuid();
   
   const deadline = new Date(Date.now() + timeMS);
   const deadlineTimeStamp = Math.floor(deadline.getTime()/1000.0);
   
   const activityTestDocument = await MActivityCheck.create({
      ID: activityTestID,
      buttonID: activeButtonCustomID,
      createdBy: interaction.user.id,
      deadline: deadline,
      employeesReacted: []
   });

   const employeesReactedTempArray: Array<Snowflake> = [];

   const activityCheckEmbed = new EmbedBuilder()
      .setTitle("LCFR | Activity check")
      .setDescription(
         "The LCFR High Command team has decided to host an activity check. Please press the button below to let the HC team know you are active. Not reacting will result in punishment.\n\n" +
         `Time limit: <t:${deadlineTimeStamp}:R>`
      )
      .setFooter({text: `AC ID: ${activityTestID}`})
      .setColor(0x9e0000);

   const channel = await interaction.client.channels.fetch(config.channels.activityTest);
   if (!channel?.isTextBased()) return;

   const message = await channel.send({embeds: [activityCheckEmbed], components: [row]});

   activeButton.onClick(
      async (subInteraction: ButtonInteraction) => {
         if (!subInteraction.member) return;
         if (!subInteraction.inCachedGuild()) return;
         if (!subInteraction.member.roles.cache.has(config.roles.reactedToActivityTest)) {
            await subInteraction.member.roles.add(config.roles.reactedToActivityTest);
            employeesReactedTempArray.push(subInteraction.user.id);
            await activityTestDocument.updateOne({$set: {
               employeesReacted: employeesReactedTempArray
            }});
            await subInteraction.reply({ephemeral: true, content: "Marked as active."});
         } else {
            await subInteraction.reply({ephemeral: true, content: "You have already reacted to this activity check!"});
         }
      },
      {
         message: message,
         time: timeMS,
         autoReset: false
      }
   )

   activeButton.onEnd(
      async () => {
         const disabledActiveButton = createDisabledButtonFromButtonKit(activeButton);
         const disabledRow = new ActionRowBuilder<ButtonKit>().setComponents(disabledActiveButton);

         message.edit({components: [disabledRow]});
      }
   )

   await interaction.editReply({content: "", embeds: [getCommandSuccessEmbed()]});
}