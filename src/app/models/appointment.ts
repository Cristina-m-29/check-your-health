import { HoursInterval } from "./workingHours";

export class Appointment {
  id: string = '';
  date: Date = new Date();
  hours_interval: HoursInterval = new HoursInterval();
  status: AppointmentStatus = 'pending';
}

declare type AppointmentStatus = 'pending' | 'accepted' | 'refused';
