import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { BaseUser } from 'src/app/models/base-user';
import { Patient } from 'src/app/models/patient';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-patient-details-appointments',
  templateUrl: './patient-details-appointments.component.html',
  styleUrls: ['./patient-details-appointments.component.sass']
})
export class PatientDetailsAppointmentsComponent implements OnInit {
  @Input() patient = new Patient();
  @Output() finish = new EventEmitter<any>();

  public patientAppointmentsForMedic: Appointment[] = [];

  constructor(
    private appointmentsService: AppointmentsService, 
    private router: Router,
    private usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.appointmentsService.getAppointmentsOfPatientForMedic(this.patient.id).subscribe((apps: Appointment[]) => {
      this.patientAppointmentsForMedic = apps;
    });
  }

  public goBack(): void {
    this.finish.emit();
  }

  public goToAppointment(appointment: Appointment): void {
    this.usersService.getUserInfo(appointment.patient).subscribe((patient: BaseUser) => {
      const app = appointment;
      app.fullPacient = <Patient>patient;
      sessionStorage.setItem('cyhSelectedPatient', JSON.stringify(this.patient));
      sessionStorage.setItem('cyhSelectedAppointment', JSON.stringify(app));
      this.router.navigateByUrl('medic/appointment?id=' + appointment.id);
    });
  }

}
