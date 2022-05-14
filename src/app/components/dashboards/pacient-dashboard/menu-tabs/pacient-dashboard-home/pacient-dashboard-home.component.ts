import { Component } from '@angular/core';

@Component({
  selector: 'cyh-pacient-dashboard-home',
  templateUrl: './pacient-dashboard-home.component.html',
  styleUrls: ['./pacient-dashboard-home.component.sass']
})
export class PacientDashboardHomeComponent {
  public loading = true;

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
