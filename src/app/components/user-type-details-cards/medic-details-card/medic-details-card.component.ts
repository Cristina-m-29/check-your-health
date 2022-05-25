import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseUser } from 'src/app/models/base-user';
import { Medic, Specialist } from 'src/app/models/medic';
import { Patient } from 'src/app/models/patient';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-medic-details-card',
  templateUrl: './medic-details-card.component.html',
  styleUrls: ['./medic-details-card.component.sass']
})
export class MedicDetailsCardComponent implements OnInit {
  @Input() isDynamicView = false;
  @Input() medic = new Medic();
  @Input() type = '';

  @Output() gotMedic = new EventEmitter<boolean>();

  constructor(private usersService: UsersService) { }

  public ngOnInit() {
    if (!this.isDynamicView) {
      this.getMedic();
    }
  }

  public isSpecialist(): boolean {
    return !!(<Specialist>this.medic).domain;
  }

  public getSpecialistDomain(): string {
    return (<Specialist>this.medic).domain;
  }

  public getMedic(): void {
    this.usersService.getUserInfo().subscribe((user: BaseUser) => {
      const patient = <Patient>user;

      this.usersService.getUserInfo(patient.medic).subscribe((user: BaseUser) => {
        this.medic = <Specialist>user;
        this.gotMedic.emit(true);
      });
    });
  }

}
