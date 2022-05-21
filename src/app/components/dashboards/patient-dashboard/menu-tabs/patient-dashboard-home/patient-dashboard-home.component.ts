import { Component } from '@angular/core';

@Component({
  selector: 'cyh-patient-dashboard-home',
  templateUrl: './patient-dashboard-home.component.html',
  styleUrls: ['./patient-dashboard-home.component.sass']
})
export class PatientDashboardHomeComponent {
  public loading = true;

  private gotOldAppointments = false;
  private gotFutureAppointments = false;
  private gotMedic = false;

  public doneWithGettingAppointments(type: string): void {
    if (type === 'old') {
      this.gotOldAppointments = true;
    }
    else {
      this.gotFutureAppointments = true;
    }

    this.checkIfLoadingIsDone();
  }

  public doneWithGettingMedic(): void {
    this.gotMedic = true;
    this.checkIfLoadingIsDone();
  }

  private checkIfLoadingIsDone(): void {
    if (this.gotOldAppointments && this.gotFutureAppointments && this.gotMedic) {
      this.loading = false;
    }
  }
}
