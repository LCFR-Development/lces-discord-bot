/* Optimized production build generated by CommandKit */
import {
  __name
} from "../chunk-4HQ2LG3N.js";

// src/validations/requiredRoles.ts
import { EmbedBuilder } from "discord.js";
function requiredRoles_default({ commandObj, interaction }) {
  if (!interaction.inCachedGuild())
    return false;
  if (!interaction.member)
    return false;
  if (!commandObj.options)
    return false;
  const commandOptions = commandObj.options;
  if (!commandOptions.requiredRoles)
    return false;
  const requiredRoles = commandOptions.requiredRoles;
  const noPermsEmbed = new EmbedBuilder().setDescription(
    `:x: You do not have permission to use this command:

Missing Role`
  ).setColor("Red");
  if (requiredRoles.areAllRequired) {
    if (!interaction.member.roles.cache.hasAll(...requiredRoles.roles)) {
      if (interaction.isChatInputCommand()) {
        interaction.reply({ ephemeral: true, embeds: [noPermsEmbed] });
      }
      return true;
    }
  } else {
    if (!interaction.member.roles.cache.hasAny(...requiredRoles.roles)) {
      if (interaction.isChatInputCommand()) {
        interaction.reply({ ephemeral: true, embeds: [noPermsEmbed] });
      }
      return true;
    }
  }
  return false;
}
__name(requiredRoles_default, "default");
export {
  requiredRoles_default as default
};