import { Diagnostic } from './diagnostic';
import { Specialist } from "./medic";
import { Patient } from "./patient";
import { Prescription } from './prescription';
import { Recommendation } from './recommendation';
import { HoursInterval } from "./workingHours";

export class Appointment {
  id: string = '';
  patient = '';
  fullPacient: Patient = new Patient();
  medic: string = '';
  recommendations: Recommendation[] = [];
  prescription = new Prescription();
  fullMedic: Specialist = new Specialist();
  date: number = 0;
  diagnostic = new Diagnostic();
  reason: string = '';
  refuseReason: string = '';
  hoursInterval: HoursInterval = new HoursInterval();
  status: AppointmentStatus = 'pending';
  examinationFinished: boolean = false;
}

export declare type AppointmentStatus = 'pending' | 'accepted' | 'refused';
