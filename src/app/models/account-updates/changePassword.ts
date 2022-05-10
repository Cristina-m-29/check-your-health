export class ChangePasswordRequest {
  userType: UserType = 'pacient';
  userId: string = '';
  newPassword: string = '';
}
