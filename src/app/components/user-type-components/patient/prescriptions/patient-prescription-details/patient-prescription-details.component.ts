import { Prescription } from './../../../../../models/prescription';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cyh-patient-prescription-details',
  templateUrl: './patient-prescription-details.component.html',
  styleUrls: ['./patient-prescription-details.component.sass']
})
export class PatientPrescriptionDetailsComponent implements OnInit {
  @Input() public prescription = new Prescription();
  @Input() public selected = false;

  constructor() { }

  ngOnInit(): void {
  }

}
