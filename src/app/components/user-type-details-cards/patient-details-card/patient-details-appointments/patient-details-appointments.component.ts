import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cyh-patient-details-appointments',
  templateUrl: './patient-details-appointments.component.html',
  styleUrls: ['./patient-details-appointments.component.sass']
})
export class PatientDetailsAppointmentsComponent implements OnInit {
  @Output() finish = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public goBack(): void {
    this.finish.emit();
  }

}
