import { Interaction } from "discord.js";
import { getConfig, instanceOfFDConfig } from "../../../config";

export default function(interaction: Interaction) {
  const config = getConfig(interaction);
  if (!config) return;
  
  if (!interaction.isAutocomplete()) return;

  const focusedValue = interaction.options.getFocused();

  const choices: Array<{name: string, value: string}> = [];
  
  if (instanceOfFDConfig(config)) {
    choices.push({name: "FD - Strike 1", value: "fd_strike_1"});
    choices.push({name: "FD - Strike 2", value: "fd_strike_2"});
    choices.push({name: "FD - Strike 3", value: "fd_strike_3"});
    choices.push({name: "FD - Suspention", value: "fd_suspention"});
    choices.push({name: "FD - Termination", value: "fd_termination"});
  }


   const filteredChoices = choices.filter((choice) => 
      choice.name.slice(choice.name.indexOf("-") + 2).toLowerCase().startsWith(focusedValue.toLowerCase()) || // Without division prefix
      choice.name.toLowerCase().startsWith(focusedValue.toLowerCase()) // With division prefix
   );
   
   interaction.respond(filteredChoices.slice(0, 25)).catch(() => {});
}
