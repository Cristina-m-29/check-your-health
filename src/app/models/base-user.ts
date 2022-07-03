export class BaseUser {
  id: string = '';
  name: string = '';
  email: string = '';
  address: string = '';
  phoneNumber: string = '';
  personalNumericCode: string = '';
  dateOfBirth: number = 0;
}

export class RegisterBaseUser extends BaseUser {
  dateOfBirthOld = new Date();
  password: string = '';
}
