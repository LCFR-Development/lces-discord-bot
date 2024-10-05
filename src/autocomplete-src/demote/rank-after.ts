import { Interaction } from "discord.js";
import { FDConfig, getConfig, instanceOfFDConfig } from "../../config";
import getPrettyString from "../../utils/getPrettyString";

function getFDRanks(): Array<string> {
    return Object.keys(new FDConfig().ranks);
}

export default function(interaction: Interaction) {
    if (!interaction.isAutocomplete()) return;

    const config = getConfig(interaction);
    if (!config) return;

    const focusedValue = interaction.options.getFocused();

    const choices: Array<{name: string, value: string}> = [];

    if (instanceOfFDConfig(config)) {
        choices.push(...getFDRanks().map(rank => ({name: "FD - " + getPrettyString(rank), value: "fd_" +rank})))
        //TODO: Add FM (need to change config)
    }
    //TODO: Add other divisions

    const filteredChoices = choices.filter((choice) => 
        choice.name.slice(choice.name.indexOf("-") + 2).toLowerCase().startsWith(focusedValue.toLowerCase()) || // Without division prefix
        choice.name.toLowerCase().startsWith(focusedValue.toLowerCase()) // With division prefix
    );
   
   interaction.respond(filteredChoices.slice(0, 25)).catch(() => {});
}