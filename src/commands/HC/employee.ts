import { SlashCommandBuilder } from "discord.js";
import { FDConfig } from "../../config";
import { SlashCommandProps } from "commandkit";

function getFDRankChoices(): Array<{name: string, value: string}> {
   const ranks = Object.keys(new FDConfig().ranks);
   return ranks.map(rank => ({name: rank, value: rank}));
}

import subcommands from "../../subcommands/employee";

export const data = new SlashCommandBuilder()
   .setName("employee")
   .setDescription("Manage employees")
   .addSubcommandGroup(sg => sg
      .setName("create")
      .setDescription("Create an employee")
      .addSubcommand(s => s
         .setName("fd")
         .setDescription("Create an FD employee")
         .addUserOption(o => o
            .setName("discord")
            .setDescription("The discord user to create an employee for")
            .setRequired(true)
         )
         .addStringOption(o => o
            .setName("roblox")
            .setDescription("The roblox user name to create an employee for")
            .setRequired(true)
         )
         .addStringOption(o => o
            .setName("callsign")
            .setDescription("The callsign of the employee")
            .setRequired(true)
         )
         .addStringOption(o => o
            .setName("rank")
            .setDescription("The rank of the employee")
            .setRequired(true)
            .setChoices(getFDRankChoices())
         )
      )
      
   )

export async function run({interaction, client, handler}: SlashCommandProps) {
   const subcommandGroup = interaction.options.getSubcommandGroup();
   const subcommand = interaction.options.getSubcommand();

   if (subcommandGroup === "create") {
      switch (subcommand) {
         case "fd": subcommands.create.fd({interaction, client, handler}); break;
      }
   }
}
      
      