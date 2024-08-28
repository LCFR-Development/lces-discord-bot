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
         .addStringOption(s => s
            .setName("notes")
            .setDescription("Notes about the shift")
            .setRequired(false)
         )
      )
      .addSubcommand(s => s
         .setName("daily")
         .setDescription("Post a daily shift to the shifts channel.")
         .addStringOption(s => s
            .setName("notes")
            .setDescription("Notes about the shift")
            .setRequired(false)
         )
      )
   )
   .addSubcommand(s => s
      .setName("find")
      .setDescription("Find a shift by ID.")
      .addStringOption(s => s
         .setName("id")
         .setDescription("The ID of the shift.")
         .setRequired(true)
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
   } else if (subcommandGroup === null) {
      switch (subcommand) {
         case "find": subcommands.find({interaction, handler, client}); break;
      }
   }
}

export const options: CustomCommandOptions = {
}