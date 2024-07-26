import { Collection, Interaction, Snowflake } from "discord.js";

// import lcfr from "./lcfr";
import lcfrDevServer from "./lcfrDevServer";

export interface IConfig {
   /**
    * Discord ID of the server/guild
    */
   guildID: Snowflake;
   /**
    * Used for type checks
    */
   readonly type: "fd" | "ems";
   /**
    * Texts in command responces
    */
   texts: {
      /**
       * The main dept. name (eg. LCFR), used in eg. Shift and Activity Check embeds.
       */
      deptName: string;
      /**
       * The activity test main string
       */
      ACMainMsg: string;
   }
   /**
    * Discord IDs of channels
    */
   channels: {
      activityTest: Snowflake,
      shift: Snowflake
   }
   /**
    * Discord IDs of misc roles
    */
   roles: {
      reactedToActivityTest: Snowflake;
      loaRole: Snowflake;
      employeeRole: Snowflake;
   };
   /**
    * Markdown of emojis
    */
   emojis: {
      loading: string;
   };
} 

export interface IEMSConfig extends IConfig {
   /**
    * Used for type checks
    */
   readonly type: "ems";
}

export interface IFDConfig extends IConfig {
   /**
    * Used for type checks
    */
   readonly type: "fd";
   /**
    * Discord IDs of rank's roles
    */
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
   /**
    * Discord IDs of category roles
    */
   rankCategories: {
      trainee_rank: Snowflake,
      low_ranks: Snowflake,
      high_ranks: Snowflake,
      low_command: Snowflake,
      high_command: Snowflake,
      commissioner_office: Snowflake
   };
}

export interface IGlobalConfig {
   /**
    * Arrays of misc role IDs from all servers
   */
   roles: {
      reactedToActivityTest: Array<Snowflake>;
      loaRole: Array<Snowflake>;
      employeeRole: Array<Snowflake>;
   };
}

export interface IFDGlobalConfig extends IGlobalConfig {
   /**
    * Arrays of role IDs from all servers
    */
   ranks: {
      probationary_firefighter: Array<Snowflake>,
      firefighter: Array<Snowflake>,
      senior_firefighter: Array<Snowflake>,
      advanced_firefighter: Array<Snowflake>,
      engineer: Array<Snowflake>,
      lieutenant: Array<Snowflake>,
      captain: Array<Snowflake>,
      senior_captain: Array<Snowflake>,
      safety_officer: Array<Snowflake>,
      battalion_chief: Array<Snowflake>,
      station_officer: Array<Snowflake>,
      district_supervisor: Array<Snowflake>,
      district_chief: Array<Snowflake>,
      assistant_commissioner: Array<Snowflake>,
      deputy_commissioner: Array<Snowflake>,
      commissioner: Array<Snowflake>
   },
   /**
    * Arrays of role IDs from all servers 
    */
   rankCategories: {
      trainee_rank: Array<Snowflake>,
      low_ranks: Array<Snowflake>,
      high_ranks: Array<Snowflake>,
      low_command: Array<Snowflake>,
      high_command: Array<Snowflake>,
      commissioner_office: Array<Snowflake>
   };
}

export interface IEMSGlobalConfig extends IGlobalConfig {

}

const configsCollection: Collection<Snowflake, IFDConfig | IEMSConfig> = new Collection();

// configsCollection.set(lcfr.guildID, lcfr);
configsCollection.set(lcfrDevServer.guildID, lcfrDevServer);

export function getConfig(interaction: Interaction): IFDConfig | IEMSConfig | undefined {
   if (!interaction.guildId) return undefined;
   return configsCollection.get(interaction.guildId);
}

export function getConfigByID(id: Snowflake): IFDConfig | IEMSConfig | undefined {
   return configsCollection.get(id);
}

export function instanceOfFDConfig(config: IFDConfig | IEMSConfig): config is IFDConfig {
   if (config.type === "fd") {
      return true;
   }
   return false;
}

export function instanceOfEMSConfig(config: IFDConfig | IEMSConfig): config is IEMSConfig {
   if (config.type === "ems") {
      return true;
   }
   return false;
}

/**
 * 
 * @returns Config from all servers.
 */
export function getFDGlobalConfig(): IFDGlobalConfig {
   let globalConfig: IFDGlobalConfig = {
      rankCategories: {
         commissioner_office: [],
         high_command: [],
         high_ranks: [],
         low_command: [],
         low_ranks: [],
         trainee_rank: []
      }, 
      ranks: {
         probationary_firefighter: [],
         firefighter: [],
         senior_firefighter: [],
         advanced_firefighter: [],
         engineer: [],
         lieutenant: [],
         captain: [],
         senior_captain: [],
         safety_officer: [],
         battalion_chief: [],
         station_officer: [],
         district_supervisor: [],
         district_chief: [],
         assistant_commissioner: [],
         deputy_commissioner: [],
         commissioner: []
      },
      roles: {
         employeeRole: [],
         loaRole: [],
         reactedToActivityTest: [],
      }
   };

   for (const [,config] of configsCollection) {
      if (!instanceOfFDConfig(config)) continue;
      for (const property in config.roles) {
         globalConfig.roles[property as keyof typeof globalConfig.roles].push(config.roles[property as keyof typeof config.roles]);
      }
      for (const property in config.rankCategories) {
         globalConfig.rankCategories[property as keyof typeof globalConfig.rankCategories].push(config.rankCategories[property as keyof typeof config.rankCategories]);
      }
      for (const property in config.ranks) {
         globalConfig.ranks[property as keyof typeof globalConfig.ranks].push(config.ranks[property as keyof typeof config.ranks]);
      }
   }

   return globalConfig;
}

export function getEMSGlobalConfig(): IEMSGlobalConfig {
   let globalConfig: IEMSGlobalConfig = {
      roles: {
         employeeRole: [],
         loaRole: [],
         reactedToActivityTest: [],
      }
   };

   for (const [,config] of configsCollection) {
      if (!instanceOfEMSConfig(config)) continue;
      for (const property in config.roles) {
         globalConfig.roles[property as keyof typeof globalConfig.roles].push(config.roles[property as keyof typeof config.roles]);
      }
   }

   return globalConfig;
}