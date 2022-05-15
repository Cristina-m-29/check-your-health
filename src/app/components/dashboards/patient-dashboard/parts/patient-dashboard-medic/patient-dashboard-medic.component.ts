import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cyh-patient-dashboard-medic',
  templateUrl: './patient-dashboard-medic.component.html',
  styleUrls: ['./patient-dashboard-medic.component.sass']
})
export class PatientDashboardMedicComponent implements OnInit {
  @Input() isDynamicView = false;

  constructor() { }

  ngOnInit() {
  }

}
