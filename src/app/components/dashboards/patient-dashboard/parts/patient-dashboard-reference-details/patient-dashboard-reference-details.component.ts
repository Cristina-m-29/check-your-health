import { Component, Input } from '@angular/core';
import { Recommendation } from 'src/app/models/recommendation';

@Component({
  selector: 'cyh-patient-dashboard-reference-details',
  templateUrl: './patient-dashboard-reference-details.component.html',
  styleUrls: ['./patient-dashboard-reference-details.component.sass']
})
export class PatientDashboardReferenceDetailsComponent {
  @Input() reference = new Recommendation();;
  @Input() selected = false;
}
