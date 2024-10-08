import { Collection, ColorResolvable, Interaction, Snowflake } from "discord.js";

// import lcfr from "./lcfr";
import lcfrDevServer from "./lcfrDevServer";

export type ConfigTypes = "fd" | "ems" | "favfd";

export interface IConfig {
   /**
    * Discord ID of the server/guild
    */
   guildID: Snowflake;
   /**
    * Used for type checks
    */
   readonly type: ConfigTypes;
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
   },
   /**
    * URLs for images
    */
   images: {
      shiftImage: string;
   }
   /**
    * Discord IDs of channels
    */
   channels: {
      activityTest: Snowflake,
      shift: Snowflake,
      appResults: Snowflake,
      promotions: Snowflake,
      demotions: Snowflake
   }
   /**
    * Discord IDs of misc roles
    */
   roles: {
      reactedToActivityTest: Snowflake;
      loaRole: Snowflake;
      employeeRole: Snowflake;
      appReader: Snowflake;
   };
   /**
    * Colors for different things
    */
   colors: {
      mainEmbedColor: ColorResolvable;
   }
} 

export interface IFAVFDConfig extends IConfig {
   /**
    * Used for type checks
    */
   readonly type: "favfd";
}

export interface IEMSConfig extends IConfig {
   /**
    * Used for type checks
    */
   readonly type: "ems";
   /**
    * Discord IDs of rank's roles
    */
   ranks: {
      junior_paramedc: Snowflake,
      paramedic: Snowflake,
      senior_paramedc: Snowflake,
      advanced_paramedc: Snowflake,
      assistant_director: Snowflake,
      deputy_director: Snowflake,
      director: Snowflake,
   },
   /**
    * Discord IDs of category roles
    */
   rankCategories: {
      paramedicine: Snowflake,
      directorates: Snowflake,
   }
}

interface FMRanks {
   probationary_fire_marshal: Snowflake,
   junior_fire_marshal: Snowflake,
   fire_marshal: Snowflake,
   senior_fire_marshal: Snowflake,
   supervisor_fire_marshal: Snowflake,
   assistant_head_fire_marshal: Snowflake,
   deputy_head_fire_marshal: Snowflake,
   head_fire_marshal: Snowflake
}

interface FMRankCategories {
  fire_marshal_service: Snowflake;
  fm_ho: Snowflake;
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
      battalion_chief: Snowflake,
      district_chief: Snowflake,
      assistant_fire_chief: Snowflake,
      fire_chief: Snowflake,
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

  // /**
  //  * Discord IDs of FM roles
  //  */
  // fmRanks: FMRanks;
  //
  // /**
  //  * Discord IDs of FM category roles
  //  */
  // fmRankCategories: FMRankCategories;
}

export class FDConfig implements IFDConfig {
   readonly type: "fd";
   ranks: IFDConfig["ranks"];
   rankCategories: IFDConfig["rankCategories"];
   guildID: IFDConfig["guildID"];
   texts: IFDConfig["texts"];
   images: IFDConfig["images"];
   colors: IFDConfig["colors"];
   channels: IFDConfig["channels"];
   roles: IFDConfig["roles"];
   constructor() {
      this.guildID = "";
      this.type = "fd";
      this.texts = {
         ACMainMsg: "",
         deptName: "",
      };
      this.images = {
         shiftImage: "",
      };
      this.channels = {
         activityTest: "",
         shift: "",
         appResults: "",
         promotions: "",
         demotions: "",
      };
      this.roles = {
         reactedToActivityTest: "",
         loaRole: "",
         employeeRole: "",
         appReader: "",
      };
      this.colors = {
         mainEmbedColor: "Default",
      };
      this.ranks = {
         probationary_firefighter: "",
         firefighter: "",
         senior_firefighter: "",
         advanced_firefighter: "",
         engineer: "",
         lieutenant: "",
         captain: "",
         battalion_chief: "",
         district_chief: "",
         assistant_fire_chief: "",
         fire_chief: "",
         assistant_commissioner: "",
         deputy_commissioner: "",
         commissioner: "",
      };
      this.rankCategories = {
         trainee_rank: "",
         low_ranks: "",
         high_ranks: "",
         low_command: "",
         high_command: "",
         commissioner_office: "",
      };
   }
}

export interface IBotConfig {
   /**
    * Markdown of emojis
    */
   emojis: {
      loading: string;
      empty: string;
   }
}

export interface IGlobalConfig {
   /**
    * Arrays of misc role IDs from all servers
   */
   roles: {
      reactedToActivityTest: Array<Snowflake>;
      loaRole: Array<Snowflake>;
      employeeRole: Array<Snowflake>;
      appReader: Array<Snowflake>;
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
      battalion_chief: Array<Snowflake>,
      district_chief: Array<Snowflake>,
      assistant_fire_chief: Array<Snowflake>,
      fire_chief: Array<Snowflake>,
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

export class FDGlobalConfig implements IFDGlobalConfig {
   ranks: IFDGlobalConfig["ranks"];
   rankCategories: IFDGlobalConfig["rankCategories"];
   roles: IFDGlobalConfig["roles"];

   constructor() {
      this.roles = {
         employeeRole: [],
         loaRole: [],
         reactedToActivityTest: [],
         appReader: [],
      };
      this.ranks = {
         probationary_firefighter: [],
         firefighter: [],
         senior_firefighter: [],
         advanced_firefighter: [],
         engineer: [],
         lieutenant: [],
         captain: [],
         battalion_chief: [],
         district_chief: [],
         assistant_fire_chief: [],
         fire_chief: [],
         assistant_commissioner: [],
         deputy_commissioner: [],
         commissioner: [],
      };
      this.rankCategories = {
         trainee_rank: [],
         low_ranks: [],
         high_ranks: [],
         low_command: [],
         high_command: [],
         commissioner_office: [],
      };
   }
}

export interface IEMSGlobalConfig extends IGlobalConfig {
   /**
    * Arrays of role IDs from all servers
    */
   ranks: {
      junior_paramedc: Array<Snowflake>,
      paramedic: Array<Snowflake>,
      senior_paramedc: Array<Snowflake>,
      advanced_paramedc: Array<Snowflake>,
      chief_executive_officer: Array<Snowflake>,
      chief_operative_officer: Array<Snowflake>,
      chief_operative_officer_assistant: Array<Snowflake>,
   },
   /**
    * Arrays of role IDs from all servers 
    */
   rankCategories: {
      paramedicine: Array<Snowflake>,
      directorates: Array<Snowflake>,
   }
}

export class EMSGlobalConfig implements IEMSGlobalConfig {
   roles: IEMSGlobalConfig["roles"];
   ranks: IEMSGlobalConfig["ranks"];
   rankCategories: IEMSGlobalConfig["rankCategories"];

   constructor() {
      this.roles = {
         employeeRole: [],
         loaRole: [],
         reactedToActivityTest: [],
         appReader: [],
      };
      this.ranks = {
         paramedic: [],
         senior_paramedc: [],
         advanced_paramedc: [],
         junior_paramedc: [],
         chief_executive_officer: [],
         chief_operative_officer: [],
         chief_operative_officer_assistant: [],
      };
      this.rankCategories = {
         paramedicine: [],
         directorates: [],
      }
   }
}

const configsCollection: Collection<Snowflake, IFDConfig | IEMSConfig | IFAVFDConfig> = new Collection();

// configsCollection.set(lcfr.guildID, lcfr);
configsCollection.set(lcfrDevServer.guildID, lcfrDevServer);

export function getConfig(interaction: Interaction): IFDConfig | IEMSConfig | IFAVFDConfig | undefined {
   if (!interaction.guildId) return undefined;
   return configsCollection.get(interaction.guildId);
}

export function getConfigByID(id: Snowflake): IFDConfig | IEMSConfig | IFAVFDConfig | undefined {
   return configsCollection.get(id);
}

export function instanceOfFDConfig(config: IFDConfig | IEMSConfig | IFAVFDConfig): config is IFDConfig {
   if (config.type === "fd") {
      return true;
   }
   return false;
}

export function instanceOfEMSConfig(config: IFDConfig | IEMSConfig | IFAVFDConfig): config is IEMSConfig {
   if (config.type === "ems") {
      return true;
   }
   return false;
}

export function instanceOfFAVFDConfig(config: IFDConfig | IEMSConfig | IFAVFDConfig): config is IFAVFDConfig {
   if (config.type === "favfd") {
      return true;
   }
   return false;
}

/**
 * 
 * @returns Config from all servers.
 */
export function getFDGlobalConfig(): IFDGlobalConfig {
   const globalConfig: IFDGlobalConfig = new FDGlobalConfig();

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
   const globalConfig: IEMSGlobalConfig = new EMSGlobalConfig();

   for (const [,config] of configsCollection) {
      if (!instanceOfEMSConfig(config)) continue;
      for (const property in config.roles) {
         globalConfig.roles[property as keyof typeof globalConfig.roles].push(config.roles[property as keyof typeof config.roles]);
      }
   }

   return globalConfig;
}
