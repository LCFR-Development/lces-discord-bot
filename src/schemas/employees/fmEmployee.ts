import { model, Schema } from "mongoose";
import { FMRanks } from "../../config/ranks/fmRanks";

export interface IFMEmployee {
   /**
    * Our UUID of the employee (the same on all employee documents)
    */
   ID: string;
   /**
    * The employee's callsign
    */
   callsign: string;
   /**
    * The employee's rank;
    */
   rank: FMRanks;
}

export const SFMEmployee = new Schema<IFMEmployee>({
   ID: {type: String, required: true},
   callsign: {type: String, required: true},
   rank: {type: Number, required: false, default: FMRanks.probationary_fire_marshal}
});

export const MFMEmployee = model<IFMEmployee>("FM-Employees", SFMEmployee);