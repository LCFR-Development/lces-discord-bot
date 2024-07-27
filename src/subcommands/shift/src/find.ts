import { SlashCommandProps } from "commandkit";
import { getConfig } from "../../../config";
import getMessageLoadingEmbed from "../../../utils/getMessageLoadingEmbed";
import { MShift } from "../../../schemas/shift";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import { EmbedBuilder } from "discord.js";

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});

   if (!interaction.inCachedGuild()) return;

   const config = getConfig(interaction);
   if (!config) return;

   await interaction.editReply({embeds: [getMessageLoadingEmbed("Finding shift...", config)]});

   const id = interaction.options.getString("id");

   const document = await MShift.findOne({ID: id});
   if (!document) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("No shift found.")]});
      return;
   }

   if (document.guild !== interaction.guild.id) {
      await interaction.editReply({embeds: [getCommandFailedToRunEmbed("This shift is not in this server.")]});
      return;
   }

   const shiftDateTimestamp = Math.floor((new Date(document.time).getTime())/1000);

   let shiftEmbed: EmbedBuilder;
   if (document.isDaily) {
      shiftEmbed = new EmbedBuilder()
         .setTitle(`Daily shift`)
         .setFields(
            {name: "ID", value: document.ID},
            {name: "Started by", value: `<@!${document.host}>\n${(await interaction.guild?.members.fetch(document.host))?.user?.username}`},
            {name: "Date", value: `<t:${shiftDateTimestamp}:f>`},
         )
         .setColor("#0099ff");
   } else {
      shiftEmbed = new EmbedBuilder()
         .setTitle(`Shift`)
         .setFields(
            {name: "ID", value: document.ID},
            {name: "Host", value: `<@!${document.host}>\n${(await interaction.guild?.members.fetch(document.host))?.user?.username}`},
            {name: "Date", value: `<t:${shiftDateTimestamp}:f>`},
         )
         .setColor("#0099ff");
   }

   await interaction.editReply({embeds: [shiftEmbed]});
}