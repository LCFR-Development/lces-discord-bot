import { SlashCommandBuilder, Snowflake } from "discord.js";

import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";

import subcommands from "../../subcommands/activity-test/index";

export const data = new SlashCommandBuilder()
   .setName("activity-check")
   .setDescription("Make an activity check.")
   .addSubcommand(s => s
      .setName("create")
      .setDescription("Create an activity check.")
      .addStringOption(o => o
         .setName("time")
         .setDescription("Time for the activity check in format 1y/d/m/s")
         .setRequired(true)
      )
   )
   .addSubcommand(s => s
      .setName("resend")
      .setDescription("Resend an activity check from id")
      .addStringOption(o => o
         .setName("id")
         .setDescription("ID of the activity check")
         .setRequired(true)
      )
   )
   .addSubcommand(s => s
      .setName("clear")
      .setDescription("Clear the server after an activity check.")
   )
   .addSubcommand(s => s
      .setName("find")
      .setDescription("Find information on an activity check.")
      .addStringOption(o => o
         .setName("id")
         .setDescription("ID of the activity check")
         .setRequired(true)
      )
   )

export async function run({interaction, client, handler}: SlashCommandProps) {
   type Subcommands = "create" | "clear" | "find" | "resend"; 

   const subcommand: Subcommands = interaction.options.getSubcommand() as Subcommands;

   switch (subcommand) {
      case "create":
         await subcommands.create({interaction, client, handler});
      break;
      case "clear":
         await subcommands.clear({interaction, client, handler});
      break;
      case "find":
         await subcommands.find({interaction, client, handler});
      break;
      case "resend":
         await subcommands.resend({interaction, client, handler});
      break;
   }
}

export const options: CustomCommandOptions = {
}
