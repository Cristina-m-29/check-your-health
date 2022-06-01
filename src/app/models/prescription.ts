import { PrescribedMedicine } from "./medicine";

export class Prescription {
  id: string = '';
  patient = '';
  pharmacy = '';
  medic = '';
  medicName? = '';
  medicines: PrescribedMedicine[] = [];
  status: PrescriptionStatus = 'pending';
}

declare type PrescriptionStatus = 'pending' | 'ready for pickup' | 'refused';
