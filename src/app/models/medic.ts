import { Patient } from "./patient";
import { WorkingHours } from "./workingHours";

export class Medic extends Patient{
  code: string = '';
  workingHours: WorkingHours = new WorkingHours();
}

export class Specialist extends Medic{
  domain: string = '';
}
