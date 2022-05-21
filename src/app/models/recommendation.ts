import { Medic, Specialist } from "./medic";
import { Patient } from "./patient";

export class Recommendation {
  id: string = '';
  patient: Patient = new Patient();
  medic: Medic = new Medic();
  specialist: Specialist = new Specialist();
  date: Date = new Date();
  details: string = '';
  feedback: string = '';
}
