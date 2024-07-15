import { EmbedBuilder } from "discord.js";


export default function() {
   return new EmbedBuilder()
      .setDescription(
         "✅ Command successfuly ran!"
      )
      .setColor("Green");
}