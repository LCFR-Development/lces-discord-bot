import { CommandOptions } from "commandkit";
import { Snowflake } from "discord.js";

export default interface CustomCommandOptions extends CommandOptions {
   /**
    * Array of Discord IDs of the required roles, areAllRequired changes if only one or all are needed.
    */
   requiredRoles?: {roles: Array<Snowflake>, areAllRequired?: boolean};
   /**
    * Makes the command not use category perms validation
    */
   skipCategoryPerms?: boolean;
   /**
    * Makes a subcommand not use category perms validation
    */
   skinCategoryPermsSubcommands?: Array<{group?: string, subcommand: string}>;
}