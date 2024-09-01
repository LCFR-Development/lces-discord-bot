import { Snowflake } from "discord.js";

export enum FDInfractions {
  strike,
  suspention,
  termination
}

export enum StrikeLevel {
  I = 1,
  II = 2,
  III = 3
}

export interface FDInfraction {
  infraction: FDInfractions,
  strikeLevel?: StrikeLevel,
}

export interface FDInfractionData extends FDInfraction {
  infractionDiscordID: Snowflake
}
