import { SlashCommandBuilder,  } from "discord.js";

import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";

export const data = new SlashCommandBuilder()
   .setName("infract")
   .setDescription("Infract an employee")
   .addUserOption(o => o
      .setName("employee")
      .setDescription("The employee to infract.")
      .setRequired(true)
   )
  .addStringOption(o => o
    .setName("infraction")
    .setDescription("The infraction.")
    .setRequired(true)
    .setAutocomplete(true)
  )
  .addStringOption(o => o
    .setName("reason")
    .setDescription("The reason for the infraction.")
    .setRequired(true)
  )

export async function run({interaction, client}: SlashCommandProps) {

}

export const options: CustomCommandOptions = {

}
