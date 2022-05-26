import { Component } from '@angular/core';

@Component({
  selector: 'cyh-medic-home',
  templateUrl: './medic-home.component.html',
  styleUrls: ['./medic-home.component.sass']
})
export class MedicHomeComponent {
  public loading = true;

  private gotOldAppointments = false;
  private gotFutureAppointments = false;

  public doneWithGettingAppointments(type: string): void {
    if (type === 'old') {
      this.gotOldAppointments = true;
    }
    else {
      this.gotFutureAppointments = true;
    }

    this.checkIfLoadingIsDone();
  }

  private checkIfLoadingIsDone(): void {
    if (this.gotOldAppointments && this.gotFutureAppointments) {
      this.loading = false;
    }
  }

}
