import { Snowflake } from "discord.js";
import { model, Schema } from "mongoose";

export interface IEmployee {
   ID: Snowflake; // Discord ID
   Departments: {readonly FD: true, FM: boolean};
   HR: any;
   callsign: string;
   rank: any;
   robloxID: string;
   shiftsAttended: number;
   shiftsHosted: number;
};

export const SEmployee = new Schema<IEmployee>({
   
});

export const MEmployee = model<IEmployee>("employees", SEmployee);