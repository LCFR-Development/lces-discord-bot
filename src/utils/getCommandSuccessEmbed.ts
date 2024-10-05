import { EmbedBuilder } from "discord.js";

/**
 * 
 * @returns Embed ready to be sent
 */
export default function(): EmbedBuilder {
   return new EmbedBuilder()
      .setDescription(
         "✅ Command successfuly ran!"
      )
      .setColor("Green");
}