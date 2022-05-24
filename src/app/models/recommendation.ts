import { Medic, Specialist } from "./medic";
import { Patient } from "./patient";

export class Recommendation {
  id: string = '';
  patient: string = '';
  medic: string = '';
  specialist: string = '';
  date: Date = new Date();
  details: string = '';
  feedback: string = '';
  canCreateAppointment: boolean = true;
}
