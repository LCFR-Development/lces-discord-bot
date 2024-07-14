import { SlashCommandBuilder, Snowflake } from "discord.js";

import ms from "@lukeed/ms";
import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";
import { configs } from "../../config";

function getRequiredRoles() {
   let temp: Array<Snowflake> = [];
   for (const [,config] of configs) {
      temp.push(config.ranks.HC);
   }
   return temp;
}

export const data = new SlashCommandBuilder()
   .setName("activity-check")
   .setDescription("Make an activity check.")
   .addSubcommand(s => s
      .setName("prepare")
      .setDescription("Prepare the activity test.")
   )
   .addSubcommand(s => s
      .setName("create")
      .setDescription("Create an activity test.")
      .addStringOption(o => o
         .setName("time")
         .setDescription("Time for the activity test in format 1y/d/m/s")
         .setRequired(true)
      )
   )
   .addSubcommand(s => s
      .setName("clear")
      .setDescription("Clear the server after an activity test.")
   )

export async function run({interaction, client}: SlashCommandProps) {

}

export const options: CustomCommandOptions = {
   requiredRoles: {roles: getRequiredRoles(), areAllRequired: false}
}