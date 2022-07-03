import { UserType } from "./userType";

export class Notification {
  id: string = '';
  userType!: UserType;
  message: string = '';
  read? = false;
}