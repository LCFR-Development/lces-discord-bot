import { Snowflake } from "discord.js";
import { model, Schema } from "mongoose";

export interface IEmployee {
   /**
    * Our UUID of the employee (the same on all employee documents)
    */
   ID: string;
   /**
    * Discord ID of the employee
    */
   discordID: Snowflake;
   /**
    * Roblox ID of the employee
    */
   robloxID: number;
   /**
    * Departments that the employee is in
    */
   departments: {
      FD: boolean, 
   };
};

export const SEmployee = new Schema<IEmployee>({
   ID: {type: String, required: true}, // Our UUID for them
   discordID: {type: String, required: true},
   robloxID: {type: Number, required: true},
   departments: {FD: {type: Boolean, default: false}}
});

export const MEmployee = model<IEmployee>("employees", SEmployee);
