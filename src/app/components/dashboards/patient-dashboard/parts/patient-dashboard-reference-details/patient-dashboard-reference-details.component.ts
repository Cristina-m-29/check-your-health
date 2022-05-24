import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BaseUser } from 'src/app/models/base-user';
import { Medic, Specialist } from 'src/app/models/medic';
import { Recommendation } from 'src/app/models/recommendation';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-patient-dashboard-reference-details',
  templateUrl: './patient-dashboard-reference-details.component.html',
  styleUrls: ['./patient-dashboard-reference-details.component.sass']
})
export class PatientDashboardReferenceDetailsComponent implements OnInit {
  @Input() reference = new Recommendation();;
  @Input() selected = false;

  public medic = new Medic();
  public specialist = new Specialist();

  constructor(private usersService: UsersService, private router: Router) {}

  public ngOnInit(): void {
    this.getCreationMedic(this.reference);
  }

  public goToCreateAppointment(): void {
    this.router.navigateByUrl('patient/appointment/create?referenceId=' + this.reference.id + '&medicId=' + this.specialist.id)
  }

  private getCreationMedic(reference: Recommendation): void {
    this.usersService.getUserInfo(reference.medic).subscribe((user: BaseUser) => {
      this.medic = <Medic>user;
      this.getSpecialist(reference);
    });
  }

  private getSpecialist(reference: Recommendation): void {
    this.usersService.getUserInfo(reference.specialist).subscribe((user: BaseUser) => {
      this.specialist = <Specialist>user;
    });
  }
}
