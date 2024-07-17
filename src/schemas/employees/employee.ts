import { Snowflake } from "discord.js";
import { model, Schema } from "mongoose";

export interface IEmployee {
   ID: string;
   discordID: Snowflake;
   robloxID: number;
   departments: {FD: boolean, EMS: boolean};
};

export const SEmployee = new Schema<IEmployee>({
   ID: {type: String, required: true}, // Our UUID for them
   discordID: {type: String, required: true},
   robloxID: {type: Number, required: true},
   departments: {FD: {type: Boolean, default: false}, EMS: {type: Boolean, default: false}},
});

export const MEmployee = model<IEmployee>("employees", SEmployee);