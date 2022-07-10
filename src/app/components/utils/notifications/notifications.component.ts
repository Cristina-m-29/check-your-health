import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { BaseUser } from 'src/app/models/base-user';
import { Notification } from 'src/app/models/notification';
import { Patient } from 'src/app/models/patient';
import { Prescription } from 'src/app/models/prescription';
import { Recommendation } from 'src/app/models/recommendation';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import { RecommendationsService } from 'src/app/services/recommandations.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {
  public notifications: Notification[] = [];

  constructor(
    private router: Router, 
    private notificationsService: NotificationsService,
    private appointmentsService: AppointmentsService,
    private recommendationsService: RecommendationsService,
    private prescriptionsService: PrescriptionsService,
    private usersService: UsersService,
  ) {}

  public ngOnInit(): void {
    this.getNotifications();

    this.notificationsService.gotNewNotifications.subscribe(() => {
      this.getNotifications();
    });
  }

  public markAsRead(notification: Notification): void {
    this.notificationsService.markNotificationAsRead(notification);
  }

  public openNotification(notification: Notification): void {
    this.markAsRead(notification);
    switch(notification.eventName) {
      case 'appointments': {
        this.openAppointmentNotification(notification);
        break;
      }
      case 'recommendations': {
        this.openRecommandationNotification(notification);
        break;
      }
      case 'prescriptions': {
        this.openPrescriptionNotification(notification);
        break;
      }
    }
  }

  private openAppointmentNotification(notification: Notification): void {
    this.appointmentsService.getAppointment(notification.objectId).subscribe((app: Appointment) => {
      this.usersService.getUserInfo(app.patient).subscribe((patient: BaseUser) => {
        app.fullPacient = <Patient>patient;

        sessionStorage.setItem('cyhSelectedAppointment', JSON.stringify(app));
        if (notification.role === 'patient') {
          this.router.navigateByUrl(notification.role + '/appointment?id=' + app.id);
        }
        else {
          const type = app.status === 'pending' ? 'new' : 'marked';
          this.router.navigateByUrl(notification.role + '/appointment?id=' + app.id + '&type=' + type);
        }
      });
      
    });
  }

  private openRecommandationNotification(notification: Notification): void {
    this.recommendationsService.getRecommendations().subscribe((recs: Recommendation[]) => {
      const rec = recs.find((r: Recommendation) => r.id === notification.objectId);
      sessionStorage.setItem('cyhSelectedReference', JSON.stringify(rec));
      this.router.navigateByUrl(notification.role + '/references');
    });
  }

  private openPrescriptionNotification(notification: Notification): void {
    this.prescriptionsService.getPrescriptions().subscribe((precs: Prescription[]) => {
      const pres = precs.find((p: Prescription) => p.id === notification.objectId);
      sessionStorage.setItem('cyhSelectedPrescription', JSON.stringify(pres));
      this.router.navigateByUrl(notification.role + '/prescriptions');
    })
  }

  private getNotifications(): void {
    this.notificationsService.getNotifications().subscribe((notifs: Notification[]) => {
      this.notifications = notifs.reverse();
    });
  }
}
