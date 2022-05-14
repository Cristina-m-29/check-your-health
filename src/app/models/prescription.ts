import { Medicine } from "./medicine";

export class Prescription {
  id: string = '';
  patientId: string = '';
  patientName: string[] = [];
  medicines: Medicine[] = [];
  pharmacyId: string = '';
  pharmacyName: string = '';
  status: PrescriptionStatus = 'pending';
}

declare type PrescriptionStatus = 'pending' | 'ready for pickup' | 'refused';
