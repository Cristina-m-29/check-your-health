import { BaseUser } from "./base-user";

export class Patient extends BaseUser {
  medic: string = '';
  conditions: string[] = [];
}

export class RegisterPatient extends Patient {
  userType: string = '';
  password: string = '';
}
