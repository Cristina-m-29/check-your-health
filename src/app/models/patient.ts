import { BaseUser } from "./base-user";

export class Patient extends BaseUser {
  medic: string = '';
  conditions: string[] = [];
}
