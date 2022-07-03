import { UserType } from "./userType";

export class Notification {
  objectId: string = '';
  userType!: UserType;
  message: string = '';
  isRead? = false;
}

export class SocketNotification {
  eventMethod: string = '';
  objectId: string = '';
  message: string = '';
}