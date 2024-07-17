import { EmbedBuilder } from "discord.js";

export default function(message: string) {
   return new EmbedBuilder()
   .setDescription(
      `:x: You do not have permission to use this command:\n\n` + 
      `${message}`
   )
   .setColor("Red");
}