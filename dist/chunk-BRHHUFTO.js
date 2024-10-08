/* Optimized production build generated by CommandKit */
import {
  __name
} from "./chunk-4HQ2LG3N.js";

// src/utils/getCommandFailedToRunEmbed.ts
import { EmbedBuilder } from "discord.js";
function getCommandFailedToRunEmbed_default(description) {
  return new EmbedBuilder().setDescription(
    `:x: This command failed to run:

${description}`
  ).setColor("Red");
}
__name(getCommandFailedToRunEmbed_default, "default");

export {
  getCommandFailedToRunEmbed_default
};
