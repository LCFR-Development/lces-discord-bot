import { EmbedBuilder } from "discord.js";
import { IConfig, IEMSConfig, IFDConfig } from "../config";

/**
 * 
 * @param message The description (it will be put after the loading emoji)
 * @param config The config for the server
 * @returns Embed ready to be sent
 */
export default function(message: string, config: IEMSConfig | IFDConfig): EmbedBuilder {
   return new EmbedBuilder()
      .setDescription(`${config.emojis.loading} ${message}`)
      .setColor("Green")
}