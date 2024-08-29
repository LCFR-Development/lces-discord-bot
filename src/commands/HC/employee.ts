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
   .addSubcommand(s => s
      .setName("create")
      .setDescription("Create an employee")
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
         .setAutocomplete(true)
      )
   )
   .addSubcommand(s => s
      .setName("find")
      .setDescription("Find an employee")
      .addUserOption(o => o
         .setName("employee")
         .setDescription("The employee to find")
         .setRequired(true)
      )
      .addStringOption(o => o
         .setName("division")
         .setDescription("The division of the employee")
         .setRequired(true)
         .setAutocomplete(true)
      )
   )
   .addSubcommand(s => s
      .setName("remove")
      .setDescription("Remove an employee")
      .addStringOption(o => o
         .setName("id")
         .setDescription("The ID of the employee to remove")
         .setRequired(false)
      )
      .addUserOption(o => o
         .setName("employee")
         .setDescription("The employee to remove")
         .setRequired(false)
      )
   )

export async function run({interaction, client, handler}: SlashCommandProps) {
   const subcommandGroup = interaction.options.getSubcommandGroup();
   const subcommand = interaction.options.getSubcommand();

   if (subcommandGroup === null) {
      switch (subcommand) {
         case "create": subcommands.create({interaction, client, handler}); break; 
         case "find": subcommands.find({interaction, client, handler}); break; 
         case "remove": subcommands.remove({interaction, client, handler}); break;
      }
   }
}
      
      