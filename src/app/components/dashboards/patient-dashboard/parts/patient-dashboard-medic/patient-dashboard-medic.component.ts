import { Component, Input, OnInit } from '@angular/core';
import { Medic } from 'src/app/models/medic';

@Component({
  selector: 'cyh-patient-dashboard-medic',
  templateUrl: './patient-dashboard-medic.component.html',
  styleUrls: ['./patient-dashboard-medic.component.sass']
})
export class PatientDashboardMedicComponent implements OnInit {
  @Input() isDynamicView = false;
  @Input() medic = new Medic();

  constructor() { }

  ngOnInit() {
  }

}
