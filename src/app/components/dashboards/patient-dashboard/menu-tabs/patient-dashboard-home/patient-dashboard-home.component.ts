import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cyh-patient-dashboard-home',
  templateUrl: './patient-dashboard-home.component.html',
  styleUrls: ['./patient-dashboard-home.component.sass']
})
export class PatientDashboardHomeComponent implements OnInit{
  public loading = true;

  private gotAppointments = true;
  private gotMedic = true;


  public ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 800);
  }

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
