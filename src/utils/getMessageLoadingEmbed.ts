import { EmbedBuilder } from "discord.js";
import botConfig from "../config/botConfig";

/**
 * 
 * @param message The description (it will be put after the loading emoji)
 * @param config The config for the server
 * @returns Embed ready to be sent
 */
export default function(message: string): EmbedBuilder {
   return new EmbedBuilder()
      .setDescription(`${botConfig.emojis.loading} ${message}`)
      .setColor("Green")
}