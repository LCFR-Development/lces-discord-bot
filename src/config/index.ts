import { Collection, Interaction, Snowflake } from "discord.js";

// import lcfr from "./lcfr";
import lcfrDevServer from "./lcfrDevServer";

export interface IConfig {
   guildID: Snowflake;
   channels: {
      activityTest: Snowflake,
   }
   roles: {
      reactedToActivityTest: Snowflake;
      loaRole: Snowflake;
      employeeRole: Snowflake;
   };
   emojis: {
      loading: string;
   };
   ranks: {
      probationary_firefighter: Snowflake,
      firefighter: Snowflake,
      senior_firefighter: Snowflake,
      advanced_firefighter: Snowflake,
      engineer: Snowflake,
      lieutenant: Snowflake,
      captain: Snowflake,
      senior_captain: Snowflake,
      safety_officer: Snowflake,
      battalion_chief: Snowflake,
      station_officer: Snowflake,
      district_supervisor: Snowflake,
      district_chief: Snowflake,
      assistant_commissioner: Snowflake,
      deputy_commissioner: Snowflake,
      commissioner: Snowflake
   }
   rankCategories: {
      trainee_rank: Snowflake,
      low_ranks: Snowflake,
      high_ranks: Snowflake,
      low_command: Snowflake,
      high_command: Snowflake,
      commissioner_office: Snowflake
   };
} 

const configsCollection: Collection<Snowflake, IConfig> = new Collection();

// configsCollection.set(lcfr.guildID, lcfr);
configsCollection.set(lcfrDevServer.guildID, lcfrDevServer);

export const configs = configsCollection;

export function getConfig(interaction: Interaction): IConfig | undefined {
   if (!interaction.guildId) return undefined;
   return configsCollection.get(interaction.guildId);
}

export function getConfigByID(id: Snowflake): IConfig | undefined {
   return configsCollection.get(id);
}