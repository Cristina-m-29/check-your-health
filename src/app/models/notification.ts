import { UserType } from "./userType";

export class Notification {
  id: string = '';
  eventMethod: string = '';
  eventName: string = '';
  message: string = '';
  objectId: string = '';
  isRead: boolean = false;
  role: string = '';
}

export class SocketNotification {
  eventMethod: string = '';
  objectId: string = '';
  message: string = '';
}