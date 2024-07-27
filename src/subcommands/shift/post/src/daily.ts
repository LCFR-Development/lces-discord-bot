import { SlashCommandProps } from "commandkit";
import getCommandSuccessEmbed from "../../../../utils/getCommandSuccessEmbed";
import { getConfig } from "../../../../config";
import { EmbedBuilder } from "discord.js";
import { MShift } from "../../../../schemas/shift";
import { v4 as uuid } from 'uuid';
import getMessageLoadingEmbed from "../../../../utils/getMessageLoadingEmbed";

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});
   
   if (!interaction.inCachedGuild()) return;
   
   const config = getConfig(interaction);
   if (!config) return;

   await interaction.editReply({embeds: [getMessageLoadingEmbed("Creating shift...", config)]});

   const shiftsChannel = await interaction.guild.channels.fetch(config.channels.shift);
   if (!shiftsChannel?.isTextBased()) return;

   const shiftID = uuid();

   const document = await MShift.create({
      ID: shiftID,
      host: interaction.user.id,
      guild: interaction.guild.id,
      isDaily: true,
      time: new Date(Date.now())
   })

   const shiftEmbed = new EmbedBuilder()
      .setTitle(`${config.texts.deptName} | Shift`)
      .setDescription(
         `Because of an SSU, a daily shift has been hosted! Come and join the game.\n\n`+
         `React with ✅ if you are joining`
      )
      .setImage(config.images.shiftImage)
      .setFooter({text: shiftID})
      .setColor("#9e0000");

   const shiftMessage = await shiftsChannel.send({embeds: [shiftEmbed], content: `<@&${config.roles.employeeRole}>`});

   await shiftMessage.react("✅");

   await interaction.editReply({embeds: [getCommandSuccessEmbed()]});
}