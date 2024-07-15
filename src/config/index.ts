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
   ranks: {
      HC: Snowflake,
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