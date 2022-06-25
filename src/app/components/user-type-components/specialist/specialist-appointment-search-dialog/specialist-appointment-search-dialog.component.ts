import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { Patient } from 'src/app/models/patient';

class DialogData {
  patient = new Patient();
  appointments: Appointment[] = [];
}

@Component({
  selector: 'cyh-specialist-appointment-search-dialog',
  templateUrl: './specialist-appointment-search-dialog.component.html',
  styleUrls: ['./specialist-appointment-search-dialog.component.sass']
})
export class SpecialistAppointmentSearchDialogComponent implements OnInit {
  public patient = new Patient();
  public appointments: Appointment[] = [];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<SpecialistAppointmentSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public ngOnInit(): void {
    this.patient = this.data.patient;
    this.appointments = this.data.appointments;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public isOldAppointment(date: number): boolean {
    return new Date() > new Date(date * 1000);
  }

  public openAppointmentDetails(appointment: Appointment, status: string): void {
    appointment.fullPacient = this.patient;
    sessionStorage.setItem('cyhSelectedAppointment', JSON.stringify(appointment));
    this.router.navigateByUrl('specialist/appointment?id=' + appointment.id + '&type=' + this.getTypeBasedOnStatus(status));
    this.onNoClick();
  }

  private getTypeBasedOnStatus(status: string): string {
    if (status === 'pending') {
      return 'new';
    }
    return 'old';
  }

}
