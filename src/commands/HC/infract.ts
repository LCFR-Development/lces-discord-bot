import { SlashCommandBuilder, Snowflake } from "discord.js";

import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";

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
}
