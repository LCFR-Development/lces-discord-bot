import { SlashCommandProps } from "commandkit";
import { SlashCommandBuilder } from "discord.js";
import CustomCommandOptions from "../../types/CustomCommandOptions";

import subcommands from "../../subcommands/shift";

export const data = new SlashCommandBuilder() 
   .setName("shift")
   .setDescription("shift stuff")
   .addSubcommandGroup(s => s
      .setName("post")
      .setDescription("post stuff")
      .addSubcommand(s => s
         .setName("normal")
         .setDescription("Post a shift to the shifts channel.")
      )
      .addSubcommand(s => s
         .setName("daily")
         .setDescription("Post a daily shift to the shifts channel.")
      )
   )

export async function run({client, handler, interaction}: SlashCommandProps) {
   const subcommandGroup = interaction.options.getSubcommandGroup();
   const subcommand = interaction.options.getSubcommand();
   
   if (subcommandGroup === "post") {
      switch (subcommand) {
         case "normal": subcommands.post.normal({interaction, handler, client}); break;
         case "daily": subcommands.post.daily({interaction, handler, client}); break;
      }
   }
}

export const options: CustomCommandOptions = {
}