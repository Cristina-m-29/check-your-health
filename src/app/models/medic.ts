import { Patient } from "./patient";
import { WorkingHours } from "./workingHours";

export class Medic extends Patient {
  code: string = '';
  workingHours: WorkingHours = new WorkingHours();
}

export class Specialist extends Medic {
  domain: string = '';
}

export class RegisterMedic extends Medic {
  userType: string = '';
  password: string = '';
}

export class RegisterSpecialist extends Specialist {
  userType: string = '';
  password: string = '';
}