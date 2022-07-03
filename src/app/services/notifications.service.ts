import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../models/notification';
import { AppointmentsService } from './appointments.service';
import { AuthService } from './auth.service';
import { PrescriptionsService } from './prescriptions.service';
import { RecommendationsService } from './recommandations.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notifications = new Subject<Notification>();
  private userType = this.authService.getUserType();

  constructor(
    private authService: AuthService,
    private appointmentsService: AppointmentsService,
    private recommendationsService: RecommendationsService,
    private prescriptionsService: PrescriptionsService,
    private usersService: UsersService,
  ) {}

  public getNotifications(): void {
    this.getAppointmentsNotifications();
    this.getRecommendationsNotifications();
    this.getPrescriptionsNotifications();
    this.getPatientsRegisterNotifications();
  }

  private getAppointmentsNotifications(): void {
    this.appointmentsService.getAppointmentEvents().subscribe((value) => {
      if (this.userType === 'patient') {
        if (value.data === 'PUT') {
          this.notifications.next({
            id: '',
            userType: this.userType,
            message: 'Statusul programării ' + '{{id}}' + ' a fost modificat!',
          });
        }
      }
      else if (this.userType === 'medic') {
        if (value.data === 'POST') {
          this.notifications.next({
            id: '',
            userType: this.userType,
            message: 'A fost găsită o nouă programare!',
          });
        }
        else if (value.data === 'PUT') {
          this.notifications.next({
            id: '',
            userType: this.userType,
            message: 'Starea programării ' + '{{id}}' + ' a fost modificată!',
          });
        }
      }
      else if (this.userType === 'specialist') {
        if (value.data === 'POST') {
          this.notifications.next({
            id: '',
            userType: this.userType,
            message: 'A fost găsită o nouă programare!',
          });
        }
      }
    });
  }

  private getRecommendationsNotifications(): void {
    this.recommendationsService.getRecommendationEvents().subscribe((value) => {
      if (this.userType === 'patient' && value.data === 'POST') {
        this.notifications.next({
          id: '',
          userType: this.userType,
          message: 'A fost găsită o nouă trimitere!',
        });
      }
    });
  }

  private getPrescriptionsNotifications(): void {
    this.prescriptionsService.getPrescriptionEvents().subscribe((value) => {
      if ((this.userType === 'patient' || this.userType === 'pharmacy') && value.data === 'POST') {
        this.notifications.next({
          id: '',
          userType: this.userType,
          message: 'A fost găsită o nouă prescripție!',
        });
      }
      if ((this.userType === 'patient' || this.userType === 'medic') && value.data === 'PUT') {
        this.notifications.next({
          id: '',
          userType: this.userType,
          message: 'Statusul prescripției de pe programarea ' + '{{id}}' + ' a fost schimbat!',
        });
      }
    });
  }

  private getPatientsRegisterNotifications(): void {
    this.usersService.getPatientsEvents().subscribe((value) => {
      if (this.userType === 'medic' && value.data === 'POST') {
        this.notifications.next({
          id: '',
          userType: this.userType,
          message: 'A fost găsit un nou pacient pentru dumneavoastră!',
        });
      }
    });
  }
}
