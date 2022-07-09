import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.sass']
})
export class EditPasswordDialogComponent {
  public editPasswordForm = new FormGroup({
    email: new FormControl(),
    oldPassword: new FormControl(),
    newPassword: new FormControl()
  })

  private email = '';
  private oldPassword = '';
  private newPassword = '';

  constructor(
    public dialogRef: MatDialogRef<EditPasswordDialogComponent>, 
    private usersService: UsersService
  ) {
    this.editPasswordForm.valueChanges.subscribe((form: any) => {
      this.email = form.email;
      this.oldPassword = form.oldPassword;
      this.newPassword = form.newPassword;
    });
  }

  public editPassword(): void {
    this.usersService.editPassword(this.email, this.oldPassword, this.newPassword);
    this.onNoClick();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
