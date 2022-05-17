import { Medic } from "./medic";
import { HoursInterval } from "./workingHours";

export class Appointment {
  id: string = '';
  date: number = 0;
  hoursInterval: HoursInterval = new HoursInterval();
  pacient: string = '';
  medic: Medic = new Medic();
  status: AppointmentStatus = 'pending';
}

declare type AppointmentStatus = 'pending' | 'accepted' | 'refused';
