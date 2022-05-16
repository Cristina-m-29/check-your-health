import { UserType } from "../userType";

export class LoginRequest {
  userType: UserType = 'patient';
  identity: string = '';
  password: string = '';

  constructor(identity: string, password: string, userType: UserType) {
      this.identity = identity;
      this.password = password;
      this.userType = userType;
  }
}
