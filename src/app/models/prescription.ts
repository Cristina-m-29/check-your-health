import { Medicine } from "./medicine";

export class Prescription {
  id: string = '';
  pacientId: string = '';
  pacientName: string[] = [];
  medicines: Medicine[] = [];
  farmacyId: string = '';
  farmacyName: string = '';
  status: PrescriptionStatus = 'pending';
}

declare type PrescriptionStatus = 'pending' | 'ready for pickup' | 'refused';
