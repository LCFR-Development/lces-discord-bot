import { EmbedBuilder } from "discord.js";

/**
 * 
 * @param message Description of the missing permissions
 * @returns Embed ready to be sent
 */
export default function(message: string): EmbedBuilder {
   return new EmbedBuilder()
   .setDescription(
      `:x: You do not have permission to use this command:\n\n` + 
      `${message}`
   )
   .setColor("Red");
}