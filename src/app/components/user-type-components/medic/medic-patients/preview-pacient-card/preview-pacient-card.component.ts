import { Component, Input } from '@angular/core';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'cyh-preview-pacient-card',
  templateUrl: './preview-pacient-card.component.html',
})
export class PreviewPacientCardComponent {
  @Input() patient = new Patient();
  @Input() selected = false;
}
