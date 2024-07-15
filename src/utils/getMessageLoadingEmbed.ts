import { EmbedBuilder } from "discord.js";
import { IConfig } from "../config";

export default function(message: string, config: IConfig) {
   return new EmbedBuilder()
      .setDescription(`${config.emojis.loading} ${message}`)
      .setColor("Green")
}