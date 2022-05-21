import { Medic } from "./medic";
import { Medicine } from "./medicine";
import { Patient } from "./patient";
import { Pharmacy } from "./pharmacy";

export class Prescription {
  id: string = '';
  patient: Patient = new Patient();
  pharmacy: Pharmacy = new Pharmacy();
  medic: Medic = new Medic();
  medicines: Medicine[] = [];
  status: PrescriptionStatus = 'pending';
}

declare type PrescriptionStatus = 'pending' | 'ready for pickup' | 'refused';
