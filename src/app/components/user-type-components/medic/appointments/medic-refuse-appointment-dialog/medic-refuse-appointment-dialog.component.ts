import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cyh-medic-refuse-appointment-dialog',
  templateUrl: './medic-refuse-appointment-dialog.component.html',
  styleUrls: ['./medic-refuse-appointment-dialog.component.sass']
})
export class MedicRefuseAppointmentDialogComponent {
  public refuseReason = '';
  public refuseReasonInput = new FormControl();

  constructor(public dialogRef: MatDialogRef<MedicRefuseAppointmentDialogComponent>) {
    this.refuseReasonInput.valueChanges.subscribe((value: string) => {
      this.refuseReason = value;
    }); 
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
