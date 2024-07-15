import { SlashCommandProps } from "commandkit";
import { getConfig, IConfig } from "../../../config";
import getCommandSuccessEmbed from "../../../utils/getCommandSuccessEmbed";

export default async function({interaction}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});
   if (!interaction.inCachedGuild()) return;

   const config = getConfig(interaction) as IConfig;


   for (const [,member] of (await interaction.guild.roles.fetch(config.roles.reactedToActivityTest))!.members) {
      if (member.roles.cache.has(config.roles.reactedToActivityTest)) {
         member.roles.remove(config.roles.reactedToActivityTest);
      }
   }
   
   await interaction.followUp({embeds: [getCommandSuccessEmbed()]});
}