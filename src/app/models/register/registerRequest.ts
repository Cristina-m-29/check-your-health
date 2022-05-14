import { WorkingHours } from "../workingHours";

export class BaseRegisterRequest {
  name: string = '';
  email?: string;
  phoneNumber: number = 0;
  password: string = '';
}

export class RegisterPacientRequest extends BaseRegisterRequest {
  medicName: string = '';
}

export class RegisterMedicRequest extends BaseRegisterRequest {
  code: string = '';
}

export class RegisterSpecialistRequest extends BaseRegisterRequest {
  code: string = '';
  domain: string = '';
}

export class RegisterPharmacyRequest extends BaseRegisterRequest {
  location: string = '';
  workingHours: WorkingHours = new WorkingHours();
}
