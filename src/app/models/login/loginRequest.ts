import { UserType } from "../userType";

export class LoginRequest {
  userType: UserType = 'patient';
  phoneNumber: number = 0;
  email: string = '';
  password: string = '';
}
