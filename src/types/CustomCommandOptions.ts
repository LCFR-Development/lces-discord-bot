import { CommandOptions } from "commandkit";
import { Snowflake } from "discord.js";

export default interface CustomCommandOptions extends CommandOptions {
   /**
    * Array of Discord IDs of the required roles, areAllRequired changes if only one or all are needed.
    */
   requiredRoles?: {roles: Array<Snowflake>, areAllRequired?: boolean};
   /**
    * Makes the command not use category perms validation
    * @deprecated Not made yet
    */
   skipCategoryPerms?: boolean;
}