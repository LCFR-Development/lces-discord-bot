import { Interaction } from "discord.js";
import divisions from "../../autocomplete-src/apps-send-results/divisions";

export default function(interaction: Interaction) {
   if (!interaction.isAutocomplete()) return;

   if (interaction.commandName === "apps") {
      if (interaction.options.getSubcommand() === "post-results") {
         if (interaction.options.getFocused(true).name === "division") {
            divisions(interaction);
         }
      }
   }
}