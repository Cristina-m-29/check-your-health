import { Medic } from "./medic";
import { Patient } from "./patient";
import { HoursInterval } from "./workingHours";

export class Appointment {
  id: string = '';
  patient: Patient = new Patient();
  medic: string = '';
  date: number = 0;
  reason: string = '';
  hoursInterval: HoursInterval = new HoursInterval();
  status: AppointmentStatus = 'pending';
}

declare type AppointmentStatus = 'pending' | 'accepted' | 'refused';
