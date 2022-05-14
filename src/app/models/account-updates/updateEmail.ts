import { UserType } from "../userType";

export class UpdateEmailRequest {
  userType: UserType = 'patient';
  userId: string = '';
  newEmail: string = '';
}
