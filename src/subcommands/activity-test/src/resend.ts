import { ButtonKit, SlashCommandProps } from "commandkit";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import { getConfig, IConfig } from "../../../config";
import { MActivityCheck } from "../../../schemas/activity-check";
import { ButtonStyle, ActionRowBuilder, ButtonInteraction, EmbedBuilder, Snowflake } from "discord.js";
import { v4 as uuid } from 'uuid';
import createDisabledButtonFromButtonKit from "../../../utils/createDisabledButtonFromButtonKit";
import getCommandSuccessEmbed from "../../../utils/getCommandSuccessEmbed";

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});
   const config = getConfig(interaction);
   if (!config) return;
   if (!interaction.inCachedGuild()) return;

   const id = interaction.options.getString("id");

   const document = await MActivityCheck.findOne({ID: id});
   if (!document) {
      await interaction.followUp({embeds: [getCommandFailedToRunEmbed("Activity Check not found.")]});
      return;
   } 

   if (document.guildID !== interaction.guild.id) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("This activity check is from another server.")]});
      return;
   }
   
   const deadlineTimestamp = Math.floor((new Date(document.deadline).getTime())/1000);

   const activeButtonID = uuid();
   await document.updateOne({$set: {buttonID: activeButtonID}});

   const activeButton = new ButtonKit()
      .setLabel("I'm active!")
      .setStyle(ButtonStyle.Success)
      .setCustomId(activeButtonID);

   const row = new ActionRowBuilder<ButtonKit>().setComponents(activeButton);

   const activityCheckEmbed = new EmbedBuilder()
      .setTitle(`${config.texts.deptName} | Activity check`)
      .setDescription(
         config.texts.ACMainMsg + "\n\n" +
         `Time limit: <t:${deadlineTimestamp}:R>`
      )
      .setFooter({text: `${document.ID}`})
      .setColor(0x9e0000);

   const channel = await interaction.client.channels.fetch(config.channels.activityTest);
   if (!channel?.isTextBased()) return;

   const message = await channel.send({embeds: [activityCheckEmbed], components: [row]});

   const timeLeft = new Date(document.deadline).getTime() - Date.now();

   activeButton.onClick(
      async (subInteraction: ButtonInteraction) => {

         const tempDocument = await MActivityCheck.findOne({ID: document.ID});
         if (!tempDocument) {
            await interaction.followUp("Activity test not found.");
            return;
         }
         const employeesReactedTempArray: Array<Snowflake> = tempDocument.employeesReacted;

         if (!subInteraction.member) return;
         if (!subInteraction.inCachedGuild()) return;
         if (!subInteraction.member.roles.cache.has(config.roles.reactedToActivityTest)) {
            await subInteraction.member.roles.add(config.roles.reactedToActivityTest);
            employeesReactedTempArray.push(subInteraction.user.id);
            await document.updateOne({$set: {
               employeesReacted: employeesReactedTempArray
            }});
            await subInteraction.reply({ephemeral: true, content: "Marked as active."});
         } else {
            await subInteraction.reply({ephemeral: true, content: "You have already reacted to this activity check!"});
         }
      },
      {
         message: message,
         time: timeLeft,
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