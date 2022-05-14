import { UserType } from "../userType";

export class ChangePasswordRequest {
  userType: UserType = 'patient';
  userId: string = '';
  newPassword: string = '';
}
