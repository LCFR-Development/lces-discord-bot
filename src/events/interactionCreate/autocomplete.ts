import { Interaction } from "discord.js";
import appResultsDivisions from "../../autocomplete-src/apps-send-results/divisions";
import rank from "../../autocomplete-src/employee-create/rank";
import promoteRankAfter from "../../autocomplete-src/promote/rank-after";
import demoteRankAfter from "../../autocomplete-src/demote/rank-after";
import employeeFindDivision from "../../autocomplete-src/employee-find/division";
import infraction from "../../autocomplete-src/infract/create/infraction";

export default function(interaction: Interaction) {
   if (!interaction.isAutocomplete()) return;

   if (interaction.commandName === "apps") {
      if (interaction.options.getSubcommand() === "post-results") {
         if (interaction.options.getFocused(true).name === "division") {
            appResultsDivisions(interaction);
         }
      }
   }

   if (interaction.commandName === "employee") {
      if (interaction.options.getSubcommandGroup() === null) {
         if (interaction.options.getSubcommand() === "create") {
            if (interaction.options.getFocused(true).name === "rank") {
               rank(interaction);
            }
         } else if (interaction.options.getSubcommand() === "find") {
            if (interaction.options.getFocused(true).name === "division") {
               employeeFindDivision(interaction);
            }
         }
      }
   }

   if (interaction.commandName === "promote") {
      if (interaction.options.getFocused(true).name === "rank-after") {
         promoteRankAfter(interaction);
      }
   }

  if (interaction.commandName === "infraction") {
    if (interaction.options.getSubcommand() === "create") {
      if (interaction.options.getFocused(true).name === "infraction") {
        infraction(interaction);
      }
    }
  }
    
   if (interaction.commandName === "demote") {
      if (interaction.options.getFocused(true).name === "rank-after") {
         promoteRankAfter(interaction);
      }
   }
}
