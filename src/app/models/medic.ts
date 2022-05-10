import { Appointment } from "./appointment";
import { Recomandation } from "./recomandation";
import { WorkingHours } from "./workingHours";

export class Medic {
  id: string = '';
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  code: string = '';
  location: string = '';
  workingHours: WorkingHours = new WorkingHours();
  pacientsIds: string[] = [];
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
  recomandations: Recomandation[] = [];
}
