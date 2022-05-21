import { Medic } from "./medic";
import { HoursInterval } from "./workingHours";

export class Appointment {
  id: string = '';
  patient: string = '';
  medic: Medic = new Medic();
  date: number = 0;
  reason: string = '';
  hoursInterval: HoursInterval = new HoursInterval();
  status: AppointmentStatus = 'pending';
}

declare type AppointmentStatus = 'pending' | 'accepted' | 'refused';
