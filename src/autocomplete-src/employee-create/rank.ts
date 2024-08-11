import { Interaction } from "discord.js";
import { FDConfig, getConfig, instanceOfFDConfig } from "../../config";
import getPrettyString from "../../utils/getPrettyString";

function getFDRanks(): Array<string> {
   const ranks = Object.keys(new FDConfig().ranks);
   return ranks;
}

export default function(interaction: Interaction) {
   const config = getConfig(interaction);
   if (!config) return;

   if (!interaction.isAutocomplete()) return;

   const focusedValue = interaction.options.getFocused();

   const choices: Array<{name: string, value: string}> = [];

   if (instanceOfFDConfig(config)) {
      choices.push(...getFDRanks().map(rank => ({name: "FD - " + getPrettyString(rank), value: "fd_" +rank})));
      //TODO Add FM ranks (need to change the config)
   }

   //TODO Add other departments' ranks

   const filteredChoices = choices.filter((choice) => 
      choice.name.slice(choice.name.indexOf("-") + 2).toLowerCase().startsWith(focusedValue.toLowerCase()) || // Without division prefix
      choice.name.toLowerCase().startsWith(focusedValue.toLowerCase()) // With division prefix
   );
   
   interaction.respond(filteredChoices.slice(0, 25)).catch(() => {});
}