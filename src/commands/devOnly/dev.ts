import { CommandOptions, SlashCommandProps } from "commandkit";
import { SlashCommandBuilder } from "discord.js";

import subcommands from "../../subcommands/dev/";

export const data = new SlashCommandBuilder()
   .setName("dev")
   .setDescription("dev")
   .addSubcommandGroup(sg => sg
      .setName("actions")
      .setDescription("actions.")
      .addSubcommand(s => s
         .setName("kill")
         .setDescription("Kill the bot.")
      )
   )
   .addSubcommandGroup(sg => sg
      .setName("get")
      .setDescription("get.")
      .addSubcommand(s => s
         .setName("uptime")
         .setDescription("Get the bot's uptime.")
      )
   )

export async function run({ interaction }: SlashCommandProps) {
   type SubcommandGroups = "actions" | "get";
   type Subcommands = "kill" | "uptime";

   const SubcommandsGrouped = {
      actions: {
         kill: "kill"
      },
      get: {
         uptime: "uptime"
      }
   }

   const subcommandGroup = interaction.options.getSubcommandGroup() as SubcommandGroups;
   const subcommand = interaction.options.getSubcommand() as Subcommands;

   if (subcommandGroup === "actions") {
      switch (subcommand) {
         case SubcommandsGrouped.actions.kill:
            await subcommands.actions.kill({interaction} as SlashCommandProps);
         break;
      }
   } else if (subcommandGroup === "get") {
      switch (subcommand) {
         case SubcommandsGrouped.get.uptime:
            await subcommands.get.uptime({interaction} as SlashCommandProps);
         break;
      }
   }
   
}  

export const options: CommandOptions = {
   devOnly: true
}