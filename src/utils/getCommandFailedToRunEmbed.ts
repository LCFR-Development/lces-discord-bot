import { EmbedBuilder } from "discord.js";

/**
 * 
 * @param description Description of why the command failed to run.
 * @returns Embed ready to be sent
 */
export default function(description: string): EmbedBuilder {
   return new EmbedBuilder()
      .setDescription(
         `:x: This command failed to run:\n\n` + 
         `${description}`
      )
      .setColor("Red");
}