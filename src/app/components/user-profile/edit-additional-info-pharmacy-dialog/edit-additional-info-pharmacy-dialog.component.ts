import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkingHours } from 'src/app/models/workingHours';
import { UsersService } from 'src/app/services/users.service';
import { EditAdditionalInfoMedicDialogComponent } from '../edit-additional-info-medic-dialog/edit-additional-info-medic-dialog.component';

export interface DialogData {
  workingHours: WorkingHours;
}

@Component({
  selector: 'cyh-edit-additional-info-pharmacy-dialog',
  templateUrl: './edit-additional-info-pharmacy-dialog.component.html',
  styleUrls: ['./edit-additional-info-pharmacy-dialog.component.sass']
})
export class EditAdditionalInfoPharmacyDialogComponent implements OnInit {
  public disabled = true;

  private wh = new WorkingHours();

  constructor(
    public dialogRef: MatDialogRef<EditAdditionalInfoMedicDialogComponent>, 
    private usersService: UsersService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public ngOnInit(): void {
    this.wh = this.data.workingHours;
    this.cd.detectChanges();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public editAdditionalInfoPharmacy(): void {
    this.usersService.editAdditionalInfoPharmacy(this.wh);
    this.onNoClick();
  }

  public changedWorkingHours(wh: WorkingHours): void {
    this.disabled = false;
    this.wh = wh;
  }

}
