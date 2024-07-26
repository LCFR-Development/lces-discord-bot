import { SlashCommandBuilder, Snowflake } from "discord.js";

import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";


 export const data = new SlashCommandBuilder()
    .setName("promote")
    .setDescription("Promote an employee")
    .addUserOption(o => o
        .setName("employee")
        .setDescription("the employee to promote")
        .setRequired(true)
     )

    export async function run({interaction, client}: SlashCommandProps) {
        
    }

export const options: CustomCommandOptions = {
}
