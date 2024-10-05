import { Snowflake, User } from "discord.js";
import { model, Schema } from "mongoose";

export interface IActivityCheck {
   /**
    * Our UUID of the activity check
    */
   ID: string,
   /**
    * CustomID of the button (becomes "disabled" after the time runs out)
    */
   buttonID: string,
   /**
    * Discord ID of the HC that created the activity check
    */
   createdBy: Snowflake,
   /**
    * The ID of the guild that the AC is in.
    */
   guildID: Snowflake,
   /**
    * The date and time when the activity check ends. 
    */
   deadline: string,
   /**
    * Array of Discord IDs of the employees who reacted to the activity check.
    */
   employeesReacted: Array<Snowflake>,
}

export const SActivityCheck = new Schema<IActivityCheck>({
   ID: {type: String, required: true},
   buttonID: {type: String, required: true},
   createdBy: {type: String, required: true},
   guildID: {type: String, required: true},
   deadline: {type: String, required: true},
   employeesReacted: {type: [{type: String, required: true}], required: true}
})

export const MActivityCheck = model<IActivityCheck>("activityChecks", SActivityCheck);