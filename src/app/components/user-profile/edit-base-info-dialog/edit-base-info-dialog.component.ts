import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

export interface DialogData {
  name: string;
  address: string;
  dateOfBirth?: number;
}

@Component({
  selector: 'cyh-edit-base-info-dialog',
  templateUrl: './edit-base-info-dialog.component.html',
  styleUrls: ['./edit-base-info-dialog.component.sass']
})
export class EditBaseInfoDialogComponent implements OnInit {
  public editBaseInfoForm = new FormGroup({
    name: new FormControl(),
    address: new FormControl(),
    dateOfBirth: new FormControl()
  });

  private name = '';
  private address = '';
  private dateOfBirth: Date | undefined = undefined;
 
  constructor(
    public dialogRef: MatDialogRef<EditBaseInfoDialogComponent>, 
    private usersService: UsersService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.editBaseInfoForm.valueChanges.subscribe((form: any) => {
      this.name = form.name;
      this.address = form.address;
      if (this.data.dateOfBirth) {
        this.dateOfBirth = form.dateOfBirth;
      }
    });
  }

  public ngOnInit(): void {
    this.editBaseInfoForm?.controls['name'].setValue(this.data.name);
    this.editBaseInfoForm?.controls['address'].setValue(this.data.address);
    if (this.data.dateOfBirth) {
      this.editBaseInfoForm?.controls['dateOfBirth'].setValue(new Date(this.data.dateOfBirth * 1000));
    }
    this.cd.detectChanges();
  }

  public editBaseInfo(): void {
    this.usersService.editBaseInfo(this.name, this.address, this.dateOfBirth);
    this.onNoClick();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
