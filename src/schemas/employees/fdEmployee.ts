import { model, Schema } from "mongoose";
import { FDRanks, FMRanks } from "../../config/ranks/fdRanks";

export interface IFDEmployee {
   /**
    * Our UUID of the employee (the same on all employee documents)
    */
   ID: string;
   /**
    * The employee's callsign
    */
   callsign: string;
   /**
    * The employee's rank as an enum
    */
   rank: FDRanks;
}

export const SFDEmployee = new Schema<IFDEmployee>({
   ID: {type: String, required: true}, // Our UUID for them, the same as in employee main document.
   callsign: {type: String, required: true},
   rank: {type: Number, required: false, default: FDRanks.probationary_firefighter},
});

export const MFDEmployee = model<IFDEmployee>("Fire-Department-Employees", SFDEmployee);