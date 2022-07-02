import { Appointment } from "./appointment";
import { Patient } from "./patient";

export class Recommendation {
  id: string = '';
  patient: string = '';
  fullPatient: Patient = new Patient();
  medic: string = '';
  medicName?: string = '';
  specialist: string = '';
  specialistName?: string = '';
  date: Date = new Date();
  details: string = '';
  feedback: string = '';
  appointment = new Appointment();
  canCreateAppointment: boolean = true;
}
