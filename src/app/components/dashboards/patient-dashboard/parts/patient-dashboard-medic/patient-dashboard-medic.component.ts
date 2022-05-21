import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseUser } from 'src/app/models/base-user';
import { Medic } from 'src/app/models/medic';
import { Patient } from 'src/app/models/patient';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-patient-dashboard-medic',
  templateUrl: './patient-dashboard-medic.component.html',
  styleUrls: ['./patient-dashboard-medic.component.sass']
})
export class PatientDashboardMedicComponent implements OnInit {
  @Input() isDynamicView = false;
  @Input() medic = new Medic();

  @Output() gotMedic = new EventEmitter<boolean>();

  constructor(private usersService: UsersService) { }

  public ngOnInit() {
    if (!this.isDynamicView) {
      this.getMedic();
    }
  }

  public getMedic(): void {
    this.usersService.getUserInfo().subscribe((user: BaseUser) => {
      const patient = <Patient>user;

      this.usersService.getUserInfo(patient.medic).subscribe((user: BaseUser) => {
        this.medic = <Medic>user;
        this.gotMedic.emit(true);
      });
    });
  }

}
