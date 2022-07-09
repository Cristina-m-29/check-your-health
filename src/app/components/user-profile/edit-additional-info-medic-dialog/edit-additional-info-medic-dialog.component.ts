import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkingHours } from 'src/app/models/workingHours';
import { UsersService } from 'src/app/services/users.service';

export interface DialogData {
  code: string;
  domain?: string;
  workingHours: WorkingHours;
}

@Component({
  selector: 'cyh-edit-additional-info-medic-dialog',
  templateUrl: './edit-additional-info-medic-dialog.component.html',
  styleUrls: ['./edit-additional-info-medic-dialog.component.sass']
})
export class EditAdditionalInfoMedicDialogComponent implements OnInit {
  public editAddInfoMedicForm = new FormGroup({
    code: new FormControl(),
    domain: new FormControl()
  });

  public disabled = true;

  private code = '';
  public domain: string | undefined = undefined; 
  private wh = new WorkingHours();

  constructor(
    public dialogRef: MatDialogRef<EditAdditionalInfoMedicDialogComponent>, 
    private usersService: UsersService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.editAddInfoMedicForm.valueChanges.subscribe((form: any) => {
      if (this.code !== '' || this.domain) {
        this.disabled = false;
      }
      this.code = form.code;
      if (this.data.domain) {
        this.domain = form.domain;
      }
    });
  }

  public ngOnInit(): void {
    this.code = this.data.code;
    this.editAddInfoMedicForm.controls['code'].setValue(this.code);
    if (this.data.domain) {
      this.domain = this.data.domain;
      this.editAddInfoMedicForm.controls['domain'].setValue(this.domain);
    }
    this.wh = this.data.workingHours;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public editAdditionalInfoMedic(): void {
    this.usersService.editAdditionalInfoMedicOrSpecialist(this.code, this.wh, this.domain);
    this.onNoClick();
  }

  public changedWorkingHours(wh: WorkingHours): void {
    this.wh = wh;
  }

}
