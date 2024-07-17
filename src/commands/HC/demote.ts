import { SlashCommandBuilder, Snowflake, GuildMember } from "discord.js";

import { SlashCommandProps } from "commandkit";
import CustomCommandOptions from "../../types/CustomCommandOptions";
import { configs, getConfig } from "../../config";
import { IConfig } from '../../config/index.ts'

function getRequiredRoles() {
    let temp: Array<Snowflake> = [];
    for (const [,config] of configs) {
       temp.push(config.rankCategories.high_command);
    }
    return temp;
 }

 export const data = new SlashCommandBuilder()
    .setName("demote")
    .setDescription("Demote an employee")
    .addUserOption(o => o
        .setName("employee")
        .setDescription("the employee to demote")
        .setRequired(true)
    )
    .addStringOption(o => o
		.setName('reason')
        .setDescription("The demotion's reason")
        .setRequired(true)
     )

    export async function run({interaction, client}: SlashCommandProps) {
     const config = getConfig(interaction) as IConfig;
     const employee = interaction.options.getMember("employee") as GuildMember;
     const reason = interaction.options.getString('reason')

     if (!employee.roles.cache.has(config.roles.employeeRole)) {
        await interaction.followUp(`This user is not an employee and can not be demoted` );
        return;
     }
    }

export const options: CustomCommandOptions = {
      requiredRoles: {roles: getRequiredRoles(), areAllRequired: false}
}
