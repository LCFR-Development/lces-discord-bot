import { EmbedBuilder } from "discord.js";

/**
 * 
 * @param description Description of why the command failed to run.
 */
export default function(description: string) {
   return new EmbedBuilder()
      .setDescription(
         `:x: This command failed to run:\n\n` + 
         `${description}`
      )
      .setColor("Red");
}