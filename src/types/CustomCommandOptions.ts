import { CommandOptions } from "commandkit";
import { Snowflake } from "discord.js";

export default interface CustomCommandOptions extends CommandOptions {
   requiredRoles?: {roles: Array<Snowflake>, areAllRequired?: boolean};
   skipCategoryPerms?: boolean;
}