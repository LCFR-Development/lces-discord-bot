import { SlashCommandProps } from "commandkit";
import { getConfig, instanceOfFDConfig } from "../../../config";
import getMessageLoadingEmbed from "../../../utils/getMessageLoadingEmbed";
import { EmbedBuilder, GuildMember } from "discord.js";
import getCommandFailedToRunEmbed from "../../../utils/getCommandFailedToRunEmbed";
import getCommandSuccessEmbed from "../../../utils/getCommandSuccessEmbed";

export default async function({interaction, client}: SlashCommandProps) {
   await interaction.deferReply({ephemeral: true});

   const division = interaction.options.getString("division") as string;
   const result = interaction.options.getString("result") as string;
   const score = interaction.options.getInteger("score") as number;
   const member = interaction.options.getMember("user") as GuildMember;
   const notes = interaction.options.getString("notes") as string;

   const divisionPretty = division.replaceAll(/_/g, " ").replaceAll(/\b./g, (s) => s.toUpperCase());

   const config = getConfig(interaction);
   if (!config) return;

   if (score > 100 || score < 0) {
      await interaction.editReply({embeds: [getMessageLoadingEmbed("Provide a score between 0 and 100.")]});
      return;
   }

   await interaction.editReply({embeds: [getMessageLoadingEmbed("Sending results...")]});

   const resultChannel = await interaction.client.channels.fetch(config.channels.appResults);
   if (!resultChannel?.isTextBased()) return;

   const embed = new EmbedBuilder()
      .setTitle(`${divisionPretty} application results`)
      .setColor(config.colors.mainEmbedColor);

   if (result === "pass") {
      embed.setDescription(
         `<@!${member.user.id}> passed the ${divisionPretty} application with a score of ${score}/100!\n\n` +
         `Notes: ${notes}`
      )
   } else if (result === "fail") {
      embed.setDescription(
         `<@!${member.user.id}> failed the ${divisionPretty} application with a score of ${score}/100!\n` +
         `You can reapply in 24 hours.\n\n` +
         `Notes: ${notes}`
      )
   }

   await resultChannel.send({embeds: [embed], content: `<@!${member.user.id}>`});

   if (result === "pass") {
      await interaction.editReply({embeds: [getMessageLoadingEmbed("Giving roles...")]});
      
      try {
         if (division === "fire_department") {
            if (instanceOfFDConfig(config)) {
               await member.roles.add([config.roles.employeeRole, config.ranks.probationary_firefighter, config.rankCategories.trainee_rank]);
            }
         } 
         //TODO: Add other divisions (need to edit config)
         else {
            throw new Error("Division not found");
         }
      } catch (e) {
         await interaction.editReply({embeds: [getCommandFailedToRunEmbed(`Could not give roles.`)]});
         return;
      }
   }

   await interaction.editReply({embeds: [getCommandSuccessEmbed()]});
}