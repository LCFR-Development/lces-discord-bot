import { Snowflake } from "discord.js";
import { model, Schema } from "mongoose";

type Infraction = "warning" | "strike" | "suspention" | "termination";

type InfractionLevel = 1 | 2 | 3 | null;

export interface IInfraction {
   /**
    * Our UUID of the infraction
    */
   ID: string, 
   /**
    * Discord ID of the HC that created the infraction
    */
   highCommandID: Snowflake,
   /**
    * Discord ID of the infracted employee
    */
   employeeID: Snowflake,
   /**
    * The infraction (ex. strike)
    */
   infraction: Infraction,
   /**
    * The infraction level (ex. 1)
    */
   infractionLevel: InfractionLevel,
   /**
    * Reason of the infraction
    */
   reason: string,
}

export const SInfraction = new Schema<IInfraction>({

})

export const MInfraction = model<IInfraction>("infractions", SInfraction);