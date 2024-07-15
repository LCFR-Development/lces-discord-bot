import { Snowflake, User } from "discord.js";
import { model, Schema } from "mongoose";

export interface IActivityCheck {
   ID: string,
   buttonID: string,
   createdBy: Snowflake,
   deadline: string,
   employeesReacted: Array<Snowflake>,
}

export const SActivityCheck = new Schema<IActivityCheck>({
   ID: {type: String, required: true},
   buttonID: {type: String, required: true},
   createdBy: {type: String, required: true},
   deadline: {type: String, required: true},
   employeesReacted: {type: [{type: String, required: true}], required: true}
})

export const MActivityCheck = model<IActivityCheck>("activityChecks", SActivityCheck);