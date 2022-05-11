import { UserType } from "../userType";

export class LoginRequest {
  userType: UserType = 'pacient';
  phoneNumber: number = 0;
  email: string = '';
  password: string = '';
}
