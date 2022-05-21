import { Medic } from "./medic";
import { Patient } from "./patient";

export class Diagnostic {
  id: string = '';
  patient: Patient = new Patient();
  medic: Medic = new Medic();
  description: string = '';
}
