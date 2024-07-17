import { SlashCommandBuilder, Snowflake } from "discord.js";

import ms from "@lukeed/ms";
import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";
import { configs } from "../../config";

import subcommands from "../../subcommands/activity-test/index";

function getRequiredRoles() {
   let temp: Array<Snowflake> = [];
   for (const [,config] of configs) {
      temp.push(config.rankCategories.high_command);
   }
   return temp;
}

export const data = new SlashCommandBuilder()
   .setName("activity-check")
   .setDescription("Make an activity check.")
   .addSubcommand(s => s
      .setName("prepare")
      .setDescription("Prepare the activity check.")
   )
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

export async function run({interaction, client}: SlashCommandProps) {
   type Subcommands = "prepare" | "create" | "clear" | "find"; 

   const subcommand: Subcommands = interaction.options.getSubcommand() as Subcommands;

   switch (subcommand) {
      case "prepare":
         subcommands.prepare({interaction} as SlashCommandProps);
      break;
      case "create":
         await subcommands.create({interaction} as SlashCommandProps);
      break;
      case "clear":
         await subcommands.clear({interaction} as SlashCommandProps);
         break;
         case "find":
            await subcommands.find({interaction} as SlashCommandProps);
      break;
   }
}

export const options: CustomCommandOptions = {
   requiredRoles: {roles: getRequiredRoles(), areAllRequired: false}
}