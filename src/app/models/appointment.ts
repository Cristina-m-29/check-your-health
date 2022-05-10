export class Appointment {
  id: string = '';
  date: Date = new Date();
  status: AppointmentStatus = 'pending';
}

declare type AppointmentStatus = 'pending' | 'accepted' | 'refused';
