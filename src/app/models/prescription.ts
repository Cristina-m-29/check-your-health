import { Medic } from "./medic";
import { PrescribedMedicine } from "./medicine";
import { Patient } from "./patient";

export class Prescription {
  id: string = '';
  patient = '';
  fullPatient? = new Patient();
  pharmacy = '';
  medic = '';
  fullMedic? = new Medic();
  medicName? = '';
  medicines: PrescribedMedicine[] = [];
  status: PrescriptionStatus = 'pending';
}

export declare type PrescriptionStatus = 'pending' | 'ready for pickup' | 'refused' | 'delivered';
