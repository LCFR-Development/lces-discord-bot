import { Snowflake } from "discord.js";
import { model, Schema } from "mongoose";
import { FDInfraction } from "../../config/infractions/fdInfractions";

export interface IInfraction {
   /**
    * Our UUID of the infraction
    */
   ID: string, 
   /**
    * Our main employee UUID of the HC that created the infraction
    */
   highCommandID: string,
   /**
    * Our main employee UUID of the infracted employee
    */
   employeeID: Snowflake,
   /**
    * Date of the infraction
    */
   date: string,
   /**
    * The ID of the guild that the infraction is in.
    */
   guildID: Snowflake,
   /**
    * The infraction (ex. strike)
    */
   infraction: FDInfraction,
   /**
    * Reason of the infraction
    */
   reason: string,
  
  /**
   * Notes for the infraction
   */
  notes: string;
  /**
   * Is the infraction appealable?
   */
  appealable: boolean;
}

export const SInfraction = new Schema<IInfraction>({
    ID: {type: String, required: true},
    highCommandID: {type: String, required: true},
    employeeID: {type: String, required: true},
    date: {type: String, required: true},
    guildID: {type: String, required: true},
    infraction: {infraction: {type: Number, required: true}, strikeLevel: {type: Number, required: false, default: undefined}},
    reason: {type: String, required: true},
    notes: {type: String, required: true},
    appealable: {type: Boolean, required: true}
})

export const MInfraction = model<IInfraction>("infractions", SInfraction);
