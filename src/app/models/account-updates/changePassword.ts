import { UserType } from "../userType";

export class ChangePasswordRequest {
  userType: UserType = 'pacient';
  userId: string = '';
  newPassword: string = '';
}
