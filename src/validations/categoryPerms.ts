import { ValidationProps } from "commandkit";
import { CommandCategories } from "../config/misc";
import { Snowflake } from "discord.js";
import getNoPermissionEmbed from "../utils/getNoPermissionEmbed";
import { getFDGlobalConfig } from "../config";
import CustomCommandOptions from "../types/CustomCommandOptions";

export default function({interaction, handler, commandObj}: ValidationProps): boolean {
   if (!commandObj.category) return false;
   const commandCategory: CommandCategories = commandObj.category as CommandCategories;
   const commandOptions: CustomCommandOptions | undefined = commandObj.options;

   if (commandOptions?.skipCategoryPerms) return false;
   
   if (!interaction.member) return false;
   if (!interaction.inCachedGuild()) return false;

   if (interaction.member.roles.cache.hasAny(...getFDGlobalConfig().rankCategories.commissioner_office)) {
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
         neededRole = [...getFDGlobalConfig().rankCategories.high_command]; 
      break;

      case "apps":
         neededRole = [...getFDGlobalConfig().roles.appReader]; 
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