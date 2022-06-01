export class Recommendation {
  id: string = '';
  patient: string = '';
  medic: string = '';
  medicName?: string = '';
  specialist: string = '';
  specialistName?: string = '';
  date: Date = new Date();
  details: string = '';
  feedback: string = '';
  canCreateAppointment: boolean = true;
}
