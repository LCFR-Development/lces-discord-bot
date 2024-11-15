import { SlashCommandBuilder,  } from "discord.js";

import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";

export const data = new SlashCommandBuilder()
  .setName("infraction")
  .setDescription("Infract an employee")
  .addSubcommand(s => s
    .setName("create")
    .setDescription("Create an infraction.")
    .addUserOption(o => o
      .setName("employee")
      .setDescription("The employee to infract.")
      .setRequired(true)
    )
    .addStringOption(o => o
      .setName("reason")
      .setDescription("The reason of the infraction.")
      .setRequired(true)
    )
    .addStringOption(o => o
      .setName("infraction")
      .setDescription("The infraction.")
      .setRequired(true)
      .setAutocomplete(true)
    )
    .addBooleanOption(o => o
      .setName("appealable")
      .setDescription("Is the infraction appealable?")
      .setRequired(true)
    )
    .addStringOption(o => o
      .setName("notes")
      .setDescription("Notes for the infraction.")
      .setRequired(false)
    )
  )

export async function run({interaction, client}: SlashCommandProps) {

}

export const options: CustomCommandOptions = {

}
