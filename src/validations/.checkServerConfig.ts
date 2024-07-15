import { ValidationProps } from "commandkit";
import { EmbedBuilder, Interaction } from "discord.js";
import CustomCommandOptions from "../types/CustomCommandOptions";
import { getConfig } from '../config/index';
import getCommandFailedToRunEmbed from "../utils/getCommandFailedToRunEmbed";

export default function({commandObj, interaction, handler}: ValidationProps): boolean {
   if (!interaction.inCachedGuild()) return false;
   if (!getConfig(interaction as Interaction)) {
      if (interaction.isChatInputCommand()) {
         interaction.reply({ephemeral: true, embeds: [getCommandFailedToRunEmbed("This server is not registered. Contact a bot developer if you think this is an error.")]});
      }
      return true;
   }

   return false; 
}