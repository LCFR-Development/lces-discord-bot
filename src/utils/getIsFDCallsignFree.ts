import { MFDEmployee } from "../schemas/employees/fdEmployee";

export default async function(callsign: string): Promise<boolean> {
   return !(await MFDEmployee.findOne({callsign: callsign}));
}