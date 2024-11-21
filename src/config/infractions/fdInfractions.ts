import { Snowflake } from "discord.js";
import { ConfigInterfaces, IConfig, instanceOfFDConfig } from "..";

export enum FDInfractions {
  verbal_warning,
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
  infractionDiscordID?: Snowflake
}

export function getFDInfractionData(infraction: FDInfraction, config: ConfigInterfaces): FDInfractionData | undefined {
  if (!instanceOfFDConfig(config)) return undefined; 
  
  const cInfractions = config.infractions;
  
  const result: FDInfractionData = {
    infraction: infraction.infraction,
    strikeLevel: infraction?.strikeLevel,
    infractionDiscordID: undefined
  }

  switch (infraction.infraction) {
    case FDInfractions.verbal_warning:
      result.infractionDiscordID = undefined;
      break;
    case FDInfractions.strike:
      switch (infraction.strikeLevel) {
        case StrikeLevel.I:
          result.infractionDiscordID = cInfractions.strike_1;
          break;
        case StrikeLevel.II:
          result.infractionDiscordID = cInfractions.strike_2;
          break;
        case StrikeLevel.III:
          result.infractionDiscordID = cInfractions.strike_3;
          break;
        default:
          result.infractionDiscordID = undefined;
          break;
      }
      break;
    case FDInfractions.suspention:
      result.infractionDiscordID = cInfractions.suspention;
      break;
    case FDInfractions.termination:
      result.infractionDiscordID = undefined;
      break;
    default:
      return undefined;
  }

  return result;
}
