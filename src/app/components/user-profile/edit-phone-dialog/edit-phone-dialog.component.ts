import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-edit-phone-dialog',
  templateUrl: './edit-phone-dialog.component.html',
  styleUrls: ['./edit-phone-dialog.component.sass']
})
export class EditPhoneDialogComponent {
  public editPhoneForm = new FormGroup({
    oldPhoneNumber: new FormControl(),
    newPhoneNumber: new FormControl()
  })

  private oldPhoneNumber = '';
  private newPhoneNumber = '';

  constructor(
    public dialogRef: MatDialogRef<EditPhoneDialogComponent>, 
    private usersService: UsersService
  ) { 
    this.editPhoneForm.valueChanges.subscribe((form: any) => {
      this.oldPhoneNumber = form.oldPhoneNumber;
      this.newPhoneNumber = form.newPhoneNumber;
    });
  }

  public editPhoneNumber(): void {
    this.usersService.editPhoneNumber(this.oldPhoneNumber, this.newPhoneNumber);
    this.onNoClick();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
