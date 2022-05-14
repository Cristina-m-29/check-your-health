import { Prescription } from "./prescription";
import { WorkingHours } from "./workingHours";

export class Pharmacy {
  id: string = '';
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  location: string = '';
  workingHours: WorkingHours = new WorkingHours();
  prescriptions: Prescription[] = [];
}