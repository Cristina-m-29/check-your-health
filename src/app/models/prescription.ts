import { Medicine } from "./medicine";

export class Prescription {
  id: string = '';
  patient: string = '';
  pharmacy: string = '';
  medic: string = '';
  medicines: Medicine[] = [];
  status: PrescriptionStatus = 'pending';
}

declare type PrescriptionStatus = 'pending' | 'ready for pickup' | 'refused';
