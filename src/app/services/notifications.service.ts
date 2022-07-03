import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { Notification } from '../models/notification';
import { AppointmentsService } from './appointments.service';
import { BaseService } from './base.service';
import { PrescriptionsService } from './prescriptions.service';
import { RecommendationsService } from './recommandations.service';
import { ToastService } from './toast.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public gotNewNotifications = new Subject();

  constructor(
    private appointmentsService: AppointmentsService,
    private recommendationsService: RecommendationsService,
    private prescriptionsService: PrescriptionsService,
    private usersService: UsersService,
    private baseService: BaseService,
    private toastService: ToastService,
  ) {}

  public getNotifications(): Observable<Notification[]> {
    return this.baseService.get<Notification[]>('notifications').pipe(catchError((err: HttpErrorResponse) => {
      this.toastService.showToast('A apărut o eroare! Nu s-a putut obține lista de notificări!')
      return EMPTY;
    }))
  }

  public markNotificationAsRead(notification: Notification): void {
    this.baseService.put<any, Notification>('notifications/' + notification.id, {}).subscribe(() => {
      this.gotNewNotifications.next('');
    });
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
    });
  }

  private getRecommendationsNotifications(): void {
    this.recommendationsService.getRecommendationEvents().subscribe((value) => {
      this.gotNewNotifications.next('');
    });
  }

  private getPrescriptionsNotifications(): void {
    this.prescriptionsService.getPrescriptionEvents().subscribe((value) => {
      this.gotNewNotifications.next('');
    });
  }

  private getPatientsRegisterNotifications(): void {
    this.usersService.getPatientsEvents().subscribe((value) => {
      this.gotNewNotifications.next('');
    });
  }
}
