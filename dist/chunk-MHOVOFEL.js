/* Optimized production build generated by CommandKit */
import {
  __name
} from "./chunk-4HQ2LG3N.js";

// src/utils/getMessageLoadingEmbed.ts
import { EmbedBuilder } from "discord.js";
function getMessageLoadingEmbed_default(message, config) {
  return new EmbedBuilder().setDescription(`${config.emojis.loading} ${message}`).setColor("Green");
}
__name(getMessageLoadingEmbed_default, "default");

export {
  getMessageLoadingEmbed_default
};