import { Interaction } from "discord.js";
import { getConfig, instanceOfEMSConfig, instanceOfFAVFDConfig, instanceOfFDConfig } from "../../config";

export default function(interaction: Interaction) {
   const config = getConfig(interaction);
   if (!config) return;

   if (!interaction.isAutocomplete()) return;

   const focusedValue = interaction.options.getFocused();

   const choices: Array<{name: string, value: string}> = [];

   if (instanceOfFDConfig(config)) {
      choices.push({name: "Fire Department", value: "fd"});
      // choices.push({name: "Fire Marshal Service", value: "fire_marshal_service"});
   }

   if (instanceOfEMSConfig(config)) {
      // choices.push({name: "Emergency Medical Services", value: "emergency_medical_services"});
   }

   if (instanceOfFAVFDConfig(config)) {
      // choices.push({name: "Volunteer Fire Department", value: "volunteer_fire_department"});
   }

   const filteredChoices = choices.filter((choice) => choice.name.toLowerCase().startsWith(focusedValue.toLowerCase()));

   interaction.respond(filteredChoices.slice(0, 25)).catch(() => {});
}