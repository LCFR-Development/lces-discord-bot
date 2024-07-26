import { SlashCommandBuilder, Snowflake } from "discord.js";

import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";
import { getGlobalConfig } from "../../config";
import { get } from "mongoose";

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
