import { model, Schema } from "mongoose";

export interface IEMSEmployee {

}

export const SEMSEmployee = new Schema({

});

export const MEMSEmployee = model("EMS-Employees", SEMSEmployee);