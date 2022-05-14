import { Appointment } from "./appointment";
import { Recommendation } from "./recommendation";
import { WorkingHours } from "./workingHours";

export class Medic {
  id: string = '';
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  code: string = '';
  location: string = '';
  workingHours: WorkingHours = new WorkingHours();
  patientsIds: string[] = [];
  appointments: Appointment[] = [];
}

export class Specialist {
  id: string = '';
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  code: string = '';
  domain: string = '';
  location: string = '';
  workingHours: WorkingHours = new WorkingHours();
  recommendations: Recommendation[] = [];
}
