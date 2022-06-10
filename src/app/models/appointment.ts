import { Diagnostic } from './diagnostic';
import { Specialist } from "./medic";
import { Patient } from "./patient";
import { HoursInterval } from "./workingHours";

export class Appointment {
  id: string = '';
  patient = '';
  fullPacient: Patient = new Patient();
  medic: string = '';
  fullMedic: Specialist = new Specialist();
  date: number = 0;
  diagnostic = new Diagnostic();
  reason: string = '';
  refuseReason: string = '';
  hoursInterval: HoursInterval = new HoursInterval();
  status: AppointmentStatus = 'pending';
  medicalLetter: string = '';
}

export declare type AppointmentStatus = 'pending' | 'accepted' | 'refused';
