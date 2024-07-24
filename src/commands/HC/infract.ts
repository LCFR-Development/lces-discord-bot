import { SlashCommandBuilder, Snowflake } from "discord.js";

import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";
import { configs } from "../../config";

function getRequiredRoles() {
   let temp: Array<Snowflake> = [];
   for (const [,config] of configs) {
      temp.push(config.rankCategories.high_command);
   }
   return temp;
}

export const data = new SlashCommandBuilder()
   .setName("infract")
   .setDescription("Infract an employee")
   .addUserOption(o => o
      .setName("employee")
      .setDescription("the employee to infract")
      .setRequired(true)
   )

export async function run({interaction, client}: SlashCommandProps) {
   
}

export const options: CustomCommandOptions = {
   requiredRoles: {roles: getRequiredRoles(), areAllRequired: false}
}
