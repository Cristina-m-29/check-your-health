import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppointmentsService } from './appointments.service';
import { PrescriptionsService } from './prescriptions.service';
import { RecommendationsService } from './recommandations.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public gotNewNotifications = new Subject();
  // private userType: UserType | null = JSON.parse(localStorage.getItem('cyhUserType') || 'null')

  constructor(
    private appointmentsService: AppointmentsService,
    private recommendationsService: RecommendationsService,
    private prescriptionsService: PrescriptionsService,
    private usersService: UsersService,
  ) {}

  public getNotifications() {
    // to do
  }

  public startListeningForNotifications(): void {
    this.getAppointmentsNotifications();
    this.getRecommendationsNotifications();
    this.getPrescriptionsNotifications();
    this.getPatientsRegisterNotifications();
  }

  private getAppointmentsNotifications(): void {
    this.appointmentsService.getAppointmentEvents().subscribe((value) => {
      this.gotNewNotifications.next('');

      // if (this.userType === 'patient') {
      //   if (value.data === 'PUT') {
      //     this.notifications.next({
      //       objectId: '',
      //       userType: this.userType,
      //       message: 'Statusul programării ' + '{{id}}' + ' a fost modificat!',
      //     });
      //   }
      // }
      // else if (this.userType === 'medic') {
      //   if (value.data === 'POST') {
      //     this.notifications.next({
      //       objectId: '',
      //       userType: this.userType,
      //       message: 'A fost găsită o nouă programare!',
      //     });
      //   }
      //   else if (value.data === 'PUT') {
      //     this.notifications.next({
      //       objectId: '',
      //       userType: this.userType,
      //       message: 'Starea programării ' + '{{id}}' + ' a fost modificată!',
      //     });
      //   }
      // }
      // else if (this.userType === 'specialist') {
      //   if (value.data === 'POST') {
      //     this.notifications.next({
      //       objectId: '',
      //       userType: this.userType,
      //       message: 'A fost găsită o nouă programare!',
      //     });
      //   }
      // }
    });
  }

  private getRecommendationsNotifications(): void {
    this.recommendationsService.getRecommendationEvents().subscribe((value) => {
      this.gotNewNotifications.next('');

      // if (this.userType === 'patient' && value.data === 'POST') {
      //   this.notifications.next({
      //     objectId: '',
      //     userType: this.userType,
      //     message: 'A fost găsită o nouă trimitere!',
      //   });
      // }
    });
  }

  private getPrescriptionsNotifications(): void {
    this.prescriptionsService.getPrescriptionEvents().subscribe((value) => {
      this.gotNewNotifications.next('');

      // if ((this.userType === 'patient' || this.userType === 'pharmacy') && value.data === 'POST') {
      //   this.notifications.next({
      //     objectId: '',
      //     userType: this.userType,
      //     message: 'A fost găsită o nouă prescripție!',
      //   });
      // }
      // if ((this.userType === 'patient' || this.userType === 'medic') && value.data === 'PUT') {
      //   this.notifications.next({
      //     objectId: '',
      //     userType: this.userType,
      //     message: 'Statusul prescripției de pe programarea ' + '{{id}}' + ' a fost schimbat!',
      //   });
      // }
    });
  }

  private getPatientsRegisterNotifications(): void {
    this.usersService.getPatientsEvents().subscribe((value) => {
      this.gotNewNotifications.next('');
      
      // if (this.userType === 'medic' && value.data === 'POST') {
      //   this.notifications.next({
      //     objectId: '',
      //     userType: this.userType,
      //     message: 'A fost găsit un nou pacient pentru dumneavoastră!',
      //   });
      // }
    });
  }
}
