import { ValidationProps } from "commandkit";
import { EmbedBuilder, Snowflake } from "discord.js";
import CustomCommandOptions from "../types/CustomCommandOptions";
import getNoPermissionEmbed from "../utils/getNoPermissionEmbed";

export default function({commandObj, interaction}: ValidationProps): boolean {
   //* Type checks
   if (!interaction.inCachedGuild()) return false;
   if (!interaction.member) return false;
   if (!commandObj.options) return false;
   
   //* Property check
   const commandOptions: CustomCommandOptions = commandObj.options;
   if (!commandOptions.requiredRoles) return false;


   //* Role check
   const requiredRoles = commandOptions.requiredRoles;

   const noPermsEmbed = getNoPermissionEmbed("Missing role.");

   if (requiredRoles.areAllRequired) {
      if (!interaction.member.roles.cache.hasAll(...requiredRoles.roles)) {
         if (interaction.isChatInputCommand()) {
            interaction.reply({ephemeral: true, embeds: [noPermsEmbed]});
         }
         return true;
      }
   } else {
      if (!interaction.member.roles.cache.hasAny(...requiredRoles.roles)) {
         if (interaction.isChatInputCommand()) {
            interaction.reply({ephemeral: true, embeds: [noPermsEmbed]});
         }
         return true;
      }
   }

   return false;
}