import { SlashCommandProps } from "commandkit";
import getMessageLoadingEmbed from "../../../../utils/getMessageLoadingEmbed";
import { getConfig } from "../../../../config";

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});

   const config = getConfig(interaction);
   if (!config) return;

   await interaction.editReply({embeds: [getMessageLoadingEmbed("Creating the employee...", config)]});
   
}