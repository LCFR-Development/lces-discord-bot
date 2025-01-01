import { CommandOptions } from "commandkit";
import { Snowflake } from "discord.js";

type RequiredRoles = {roles: Array<Snowflake>, areAllRequired?: boolean};
type Subcommand = {group?: string, subcommand: string};

export default interface CustomCommandOptions extends CommandOptions {
   /**
    * Array of Discord IDs of the required roles, areAllRequired changes if only one or all are needed.
    */
   requiredRoles?: RequiredRoles;
  /**
   * Array of subcommands with requiredRoles pinned to them
   */
  subcommandRequiredRoles?: [{subcommand: Subcommand, requiredRoles: RequiredRoles}];
   /**
    * Makes the command not use category perms validation
    */
   skipCategoryPerms?: boolean;
   /**
    * Makes a subcommand not use category perms validation
    */
   skipCategoryPermsSubcommands?: Array<Subcommand>;
}
