import { ValidationProps } from "commandkit";
import { EmbedBuilder } from "discord.js";
import CustomCommandOptions from "../types/CustomCommandOptions";

export default function({commandObj, interaction, handler}: ValidationProps): boolean {
   //* Type checks 
   if (!commandObj.options) return false;

   //* Property check
   const commandOptions: CustomCommandOptions = commandObj.options;
   if (!commandOptions.devOnly) return false;

   //* Dev Only check
   const noPermsEmbed = new EmbedBuilder()
      .setDescription(
         `:x: You do not have permission to use this command:\n\n` + 
         `This command is dev only`
      )
      .setColor("Red");

   if (!handler.devUserIds.includes(interaction.user.id)) {
      if (interaction.isChatInputCommand()) {
         interaction.reply({ephemeral: true, embeds: [noPermsEmbed]});
      }
      return true;
   }

   return false;
}