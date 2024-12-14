import { SlashCommandProps } from "commandkit";
import { SlashCommandBuilder } from "discord.js";
import CustomCommandOptions from "../../types/CustomCommandOptions";

import subcommands from "../../subcommands/shift";

export const data = new SlashCommandBuilder() 
   .setName("shift")
   .setDescription("shift stuff")
   .addSubcommand(s => s
       .setName("post")
       .setDescription("Post a shift to the shifts channel.")
       .addStringOption(o => o
        .setName("station")
        .setDescription("The station the shift is taking place in.")
        .setRequired(true)
        .setChoices([
          {name: "Station 1", value: "Station1"},
          {name: "Station 2", value: "Station2"},
        ])
       )
       .addStringOption(s => s
          .setName("notes")
          .setDescription("Notes about the shift")
          .setRequired(false)
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
   const subcommand = interaction.options.getSubcommand();
   
  switch (subcommand) {
     case "find": subcommands.find({interaction, handler, client}); break;
     case "post": subcommands.post({interaction, handler, client}); break;
  }
}

export const options: CustomCommandOptions = {
}
