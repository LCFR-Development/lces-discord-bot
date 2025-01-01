import { ValidationProps } from "commandkit";
import CustomCommandOptions from "../types/CustomCommandOptions";
import getNoPermissionEmbed from "../utils/getNoPermissionEmbed";

export default function({commandObj, interaction}: ValidationProps): boolean {
  if (!interaction.inCachedGuild()) return false;
  if (!interaction.isChatInputCommand()) return false;
  if (!interaction.member) return false;
  if (!commandObj.options) return false;

  const commandOptions: CustomCommandOptions = commandObj.options as CustomCommandOptions;
  if (!commandOptions) return false;
  
  
  const requiredRoles = commandOptions.subcommandRequiredRoles;
  if (!requiredRoles) return false;

  const noPermsEmbed = getNoPermissionEmbed("Missing role.");
  
  const subcommandGroup = interaction.options.getSubcommandGroup();
  const subcommand = interaction.options.getSubcommand();

  for (const option of requiredRoles) {
    if (subcommandGroup && option.subcommand.group && subcommandGroup !== option.subcommand.group) continue;
    if (subcommand !== option.subcommand.subcommand) continue;
    
    
    if (option.requiredRoles.areAllRequired) {
      if (!interaction.member.roles.cache.hasAll(...option.requiredRoles.roles)) {
        if (interaction.isChatInputCommand()) {
            interaction.reply({ephemeral: true, embeds: [noPermsEmbed]});
        }
         return true;
      }
    } else {
      if (!interaction.member.roles.cache.hasAny(...option.requiredRoles.roles)) {
         if (interaction.isChatInputCommand()) {
            interaction.reply({ephemeral: true, embeds: [noPermsEmbed]});
         }
         return true;
      }
    }
  }
  
  return false;
}
