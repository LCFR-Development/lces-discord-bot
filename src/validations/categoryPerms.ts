import { ValidationProps } from "commandkit";
import { CommandCategories } from "../config/misc";
import { Snowflake } from "discord.js";
import getNoPermissionEmbed from "../utils/getNoPermissionEmbed";
import { getGlobalConfig } from "../config";
import CustomCommandOptions from "../types/CustomCommandOptions";

export default function({interaction, handler, commandObj}: ValidationProps): boolean {
   if (!commandObj.category) return false;
   const commandCategory: CommandCategories = commandObj.category as CommandCategories;
   if (!commandObj.options) return false;
   const commandOptions: CustomCommandOptions = commandObj.options;

   if (commandOptions.skipCategoryPerms) return false;
   
   if (!interaction.member) return false;
   if (!interaction.inCachedGuild()) return false;

   if (interaction.member.roles.cache.hasAny(...getGlobalConfig().rankCategories.commissioner_office)) {
      return false;
   }

   let neededRole: Array<Snowflake> | undefined;
   switch (commandCategory) {
      case "devOnly":
         if (!handler.devUserIds.includes(interaction.user.id)) {
            if (interaction.isChatInputCommand()) {
               interaction.reply({ephemeral: true, embeds: [getNoPermissionEmbed("This command is dev only.")]});
            }
            return true;
         }
      break;
      case "HC":
         neededRole = getGlobalConfig().rankCategories.high_command; 
      break;

      default: 
         neededRole = undefined;
   }
   if (neededRole === undefined) return false;

   if (!interaction.member.roles.cache.hasAny(...neededRole)) {
      if (interaction.isChatInputCommand()) {
         interaction.reply({ephemeral: true, embeds: [getNoPermissionEmbed("Missing role.")]});
      }
      return true;
   }

   return false;
} 