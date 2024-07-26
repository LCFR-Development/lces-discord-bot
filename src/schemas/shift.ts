import { Snowflake } from "discord.js";
import { model, Schema } from "mongoose";

export interface IShift {
   /**
    * Our UUID of the shift
    */
   ID: string;
   /**
    * Discord ID of the host.
    */
   host: Snowflake;
   /**
    * Is this a daily shift
    */
   isDaily: boolean;
   /**
    * Date and time of the shift
    */
   time: string;
}

export const SShift = new Schema<IShift>({
   ID: {type: String, required: true},
   host: {type: String, required: true},
   isDaily: {type: Boolean, required: true},
   time: {type: String, required: true}
})

export const MShift = model<IShift>("shifts", SShift);