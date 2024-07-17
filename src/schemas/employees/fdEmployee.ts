import { model, Schema } from "mongoose";
import { FDRanks, FMRanks } from "../../config/fdRanks";

export interface IFDEmployee {
   ID: string;
   callsign: string;
   rank: FDRanks;
   fmRank: FMRanks;
}

export const SFDEmployee = new Schema<IFDEmployee>({
   ID: {type: String, required: true}, // Our UUID for them, the same as in employee main document.
   callsign: {type: String, required: true},
   rank: {type: Number, required: false, default: FDRanks.probationary_firefighter},
   fmRank: {type: Number, required: false, default: FMRanks.none}
});

export const MFDEmployee = model<IFDEmployee>("Fire-Department-Employees", SFDEmployee);