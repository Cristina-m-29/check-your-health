import { UserType } from "../userType";

export class UpdateEmailRequest {
  userType: UserType = 'pacient';
  userId: string = '';
  newEmail: string = '';
}
