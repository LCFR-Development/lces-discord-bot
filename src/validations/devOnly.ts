import { ValidationProps } from "commandkit";
import { EmbedBuilder } from "discord.js";
import CustomCommandOptions from "../types/CustomCommandOptions";
import getNoPermissionEmbed from "../utils/getNoPermissionEmbed";

export default function({commandObj, interaction, handler}: ValidationProps): boolean {
   //* Type checks 
   if (!commandObj.options) return false;

   //* Property check
   const commandOptions: CustomCommandOptions = commandObj.options;
   if (!commandOptions.devOnly) return false;

   //* Dev Only check
   const noPermsEmbed = getNoPermissionEmbed("This command is dev only.");

   if (!handler.devUserIds.includes(interaction.user.id)) {
      if (interaction.isChatInputCommand()) {
         interaction.reply({ephemeral: true, embeds: [noPermsEmbed]});
      }
      return true;
   }

   return false;
}