import { ButtonKit, SlashCommandProps } from "commandkit";

import { getConfig, IConfig } from "../../../config";
import { ActionRowBuilder, EmbedBuilder } from "@discordjs/builders";
import { ButtonInteraction, ButtonStyle, Colors, Snowflake } from "discord.js";
import * as ms from '@lukeed/ms';
import getCommandSuccessEmbed from "../../../utils/getCommandSuccessEmbed";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import {generate as generateID} from "generate-password";
import { IActivityCheck, MActivityCheck, SActivityCheck } from '../../../schemas/activity-check';

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});
   const config = getConfig(interaction) as IConfig;

   const time: string = interaction.options.getString("time") as string;
   const timeMS = ms.parse(time);

   if (timeMS === undefined) {
      await interaction.followUp({embeds: [getCommandFailedToRunEmbed("The time you provided is invalid.")]});
      return;
   }

   const activeButtonCustomID = (Date.now()).toString();

   const activeButton = new ButtonKit()
      .setLabel("I'm active!")
      .setStyle(ButtonStyle.Success)
      .setCustomId(activeButtonCustomID);

   const row = new ActionRowBuilder<ButtonKit>().setComponents(activeButton);

   
   const activityTestID = generateID({
      length: 20,
      numbers: true,
      uppercase: false,
      excludeSimilarCharacters: true,
   })
   
   
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
         const label = activeButton.toJSON().label as string;
         const style = activeButton.toJSON().style;

         const disabledActiveButton = new ButtonKit()
            .setLabel(label)
            .setStyle(style)
            .setCustomId("disabled")
            .setDisabled(true)
         const disabledRow = new ActionRowBuilder<ButtonKit>().setComponents(disabledActiveButton);

         message.edit({components: [disabledRow]});
      }
   )

   await interaction.followUp({embeds: [getCommandSuccessEmbed()]});
}