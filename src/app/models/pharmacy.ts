import { BaseUser } from "./base-user";
import { Prescription } from "./prescription";
import { WorkingHours } from "./workingHours";

export class Pharmacy extends BaseUser {
  workingHours: WorkingHours = new WorkingHours();
}
