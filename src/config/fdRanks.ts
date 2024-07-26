import { Snowflake } from "discord.js";
import { getConfig, getConfigByID, IConfig, instanceOfFDConfig } from './index';

export enum FDRanks {
   probationary_firefighter,
   firefighter,
   senior_firefighter,
   advanced_firefighter,
   engineer,
   lieutenant,
   captain,
   senior_captain,
   safety_officer,
   battalion_chief,
   station_officer,
   district_supervisor,
   district_chief,
   assistant_commissioner,
   deputy_commissioner,
   commissioner
};

export enum FDRankCategories {
   trainee_rank,
   low_ranks,
   high_ranks,
   low_command,
   high_command,
   commissioner_office
}

interface FDRank {
   /**
    * The rank as an enum
    */
   rank: FDRanks;
   /**
    * Discord ID of the rank's role in the discord server
    */
   rankID: Snowflake;
   /**
    * Category of the rank as an enum
    */
   rankCategory: FDRankCategories;
   /**
    * Discord ID of the category role in the discord server
    */
   rankCategoryID: Snowflake;
}

export function getFDRankFromDBAsEnum(rank: number): FDRanks | undefined {
   if (rank < FDRanks.probationary_firefighter || rank > FDRanks.commissioner || Math.ceil(rank) !== rank) {
      return undefined;
   }
   return rank;
}

export function getFDRankInfoFromDB(rank: number, guildID: Snowflake): FDRank | undefined {
   if (getFDRankFromDBAsEnum(rank) === undefined) {
      return undefined;
   }

   return getFDRankInfo(rank, guildID);
}

export function getFDRankInfo(rank: FDRanks, guildID: Snowflake): FDRank | undefined {
   let rankID: Snowflake;
   let rankCategory: FDRankCategories;
   let rankCategoryID: Snowflake;
   
   const config = getConfigByID(guildID);
   if (!config) {
      return undefined;
   }

   if (!instanceOfFDConfig(config)) return undefined;

   const tempRankString = FDRanks[rank] as keyof typeof config.ranks;
   let tempCategoryString: keyof typeof config.rankCategories;
   rankID = config.ranks[tempRankString];

   if (!config) {
      return undefined;
   } else if (rank === FDRanks.probationary_firefighter) {
      rankCategory = FDRankCategories.trainee_rank;

   } else if (rank >= FDRanks.firefighter && rank <= FDRanks.advanced_firefighter) {
      rankCategory = FDRankCategories.low_ranks;

   } else if (rank >= FDRanks.engineer && rank <= FDRanks.lieutenant) {
      rankCategory = FDRankCategories.high_ranks;

   } else if (rank >= FDRanks.captain && rank <= FDRanks.safety_officer) {
      rankCategory = FDRankCategories.low_command;

   } else if (rank >= FDRanks.battalion_chief && rank <= FDRanks.district_chief) {
      rankCategory = FDRankCategories.high_command;
      
   } else if (rank >= FDRanks.assistant_commissioner && rank <= FDRanks.commissioner) {
      rankCategory = FDRankCategories.commissioner_office;

   } else {
      rankCategory = FDRankCategories.trainee_rank; // Never happens, had to make typescript happy
   }


   tempCategoryString = FDRankCategories[rankCategory] as keyof typeof config.rankCategories;
   rankCategoryID = config.rankCategories[tempCategoryString];

   const FDRankReady: FDRank = {rank, rankCategory, rankCategoryID, rankID};
   return FDRankReady;
}

export enum FMRanks {
   none = -1, // Not in FM
   probationary_fire_marshal,
   junior_fire_marshal,
   fire_marshal,
   senior_fire_marshal,
   supervisor_fire_marshal,
   assistant_head_fire_marshal,
   deputy_head_fire_marshal,
   head_fire_marshal
}

//TODO: The same thing as getFdRankInfo() and the functions above but for FM