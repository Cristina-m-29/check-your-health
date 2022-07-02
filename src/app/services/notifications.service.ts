import { Injectable } from '@angular/core';
import { AppointmentsService } from './appointments.service';
import { RecommendationsService } from './recommandations.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private appointmentsService: AppointmentsService,
    private recommendationsService: RecommendationsService,
  ) { }

  public getNotifications(): void {
    this.getAppointmentsNotifications();
    this.getRecommendationsNotifications();
  }

  private getAppointmentsNotifications(): void {
    this.appointmentsService.getAppointmentEvents().subscribe((value) => {
      console.log('norif', value);
    });
  }

  private getRecommendationsNotifications(): void {
    this.recommendationsService.getRecommendationEvents().subscribe((value) => {
      console.log('norif', value);
    });
  }
}
