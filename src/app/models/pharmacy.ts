import { BaseUser } from "./base-user";
import { WorkingHours } from "./workingHours";

export class Pharmacy extends BaseUser {
  workingHours: WorkingHours = new WorkingHours();
}

export class RegisterPharmacy extends Pharmacy {
  userType: string = '';
  password: string = '';
}
