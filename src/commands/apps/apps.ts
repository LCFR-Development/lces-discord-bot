import { SlashCommandBuilder } from "discord.js";
import CustomCommandOptions from "../../types/CustomCommandOptions";

import subcommands from "../../subcommands/apps";
import { SlashCommandProps } from "commandkit";

export const data = new SlashCommandBuilder()
   .setName("apps")
   .setDescription("apps stuff")
   .addSubcommand(s => s
      .setName("post-results")
      .setDescription("Post results to the app results channel and gives roles to the user.")
      .addStringOption(o => o
         .setName("division")
         .setDescription("What application?")
         .setRequired(true)
         .setAutocomplete(true)
      )
      .addStringOption(o => o
         .setName("result")
         .setDescription("The result of the application.")
         .setRequired(true)
         .setChoices([
            {name: "Pass", value: "pass"},
            {name: "Fail", value: "fail"}
         ])
      )
      .addIntegerOption(o => o
         .setName("score")
         .setDescription("The score of the application.")
         .setRequired(true)
      )
      .addUserOption(o => o
         .setName("user")
         .setDescription("The user who applied.")
         .setRequired(true)
      ) 
      .addStringOption(o => o
         .setName("notes")
         .setDescription("Notes about the application.")
         .setRequired(true)
      )
   ) 

export async function run({client, handler, interaction}: SlashCommandProps) {
   const subcommandGroup = interaction.options.getSubcommandGroup();
   const subcommand = interaction.options.getSubcommand();
   
   if (subcommandGroup === null) {
      switch (subcommand) {
         case "post-results": subcommands.sendResults({interaction, handler, client}); break;
      }
   }
}
