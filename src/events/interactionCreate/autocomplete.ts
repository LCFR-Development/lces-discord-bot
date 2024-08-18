import { Interaction } from "discord.js";
import divisions from "../../autocomplete-src/apps-send-results/divisions";
import rank from "../../autocomplete-src/employee-create/rank";
import promoteRankAfter from "../../autocomplete-src/promote/rank-after";
import demoteRankAfter from "../../autocomplete-src/demote/rank-after";

export default function(interaction: Interaction) {
   if (!interaction.isAutocomplete()) return;

   if (interaction.commandName === "apps") {
      if (interaction.options.getSubcommand() === "post-results") {
         if (interaction.options.getFocused(true).name === "division") {
            divisions(interaction);
         }
      }
   }

   if (interaction.commandName === "employee") {
      if (interaction.options.getSubcommandGroup() === null) {
         if (interaction.options.getSubcommand() === "create") {
            if (interaction.options.getFocused(true).name === "rank") {
               rank(interaction);
            }
         }
      }
   }

   if (interaction.commandName === "promote") {
      if (interaction.options.getFocused(true).name === "rank-after") {
         promoteRankAfter(interaction);
      }
   }

   if (interaction.commandName === "demote") {
      if (interaction.options.getFocused(true).name === "rank-after") {
         promoteRankAfter(interaction);
      }
   }
}