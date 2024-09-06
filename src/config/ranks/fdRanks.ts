import { Snowflake } from "discord.js";
import {  getConfigByID, instanceOfFDConfig } from '../index';
//TODO Update ranks
export enum FDRanks {
   probationary_firefighter,
   firefighter,
   senior_firefighter,
   advanced_firefighter,
   engineer,
   lieutenant,
   captain,
   battalion_chief,
   district_chief,
   assistant_fire_chief,
   fire_chief,
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

export interface FDRank {
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

   } else if (rank >= FDRanks.firefighter && rank <= FDRanks.senior_firefighter) {
      rankCategory = FDRankCategories.low_ranks;

   } else if (rank >= FDRanks.advanced_firefighter && rank <= FDRanks.engineer) {
      rankCategory = FDRankCategories.high_ranks;

   } else if (rank >= FDRanks.lieutenant && rank <= FDRanks.captain) {
      rankCategory = FDRankCategories.low_command;

   } else if (rank >= FDRanks.battalion_chief && rank <= FDRanks.fire_chief) {
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
