import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cyh-specialist-home',
  templateUrl: './specialist-home.component.html',
})
export class SpecialistHomeComponent {
  public loading = true;

  public searchRecommendationInput = new FormControl();

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
