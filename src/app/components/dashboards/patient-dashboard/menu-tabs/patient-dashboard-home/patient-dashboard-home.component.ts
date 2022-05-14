import { Component } from '@angular/core';

@Component({
  selector: 'cyh-patient-dashboard-home',
  templateUrl: './patient-dashboard-home.component.html',
  styleUrls: ['./patient-dashboard-home.component.sass']
})
export class PatientDashboardHomeComponent {
  // public loading = true;
  public loading = false;

  private gotAppointments = false;
  private gotMedic = false;

  public doneWithGettingAppointments(): void {
    this.gotAppointments = true;
    this.checkIfLoadingIsDone();
  }

  public doneWithGettingMedic(): void {
    this.gotMedic = true;
    this.checkIfLoadingIsDone();
  }

  private checkIfLoadingIsDone(): void {
    if (this.gotAppointments && this.gotMedic) {
      this.loading = false;
    }
  }
}
