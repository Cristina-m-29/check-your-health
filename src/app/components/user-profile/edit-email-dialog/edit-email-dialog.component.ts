import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'cyh-edit-email-dialog',
  templateUrl: './edit-email-dialog.component.html',
  styleUrls: ['./edit-email-dialog.component.sass']
})
export class EditEmailDialogComponent {
  public editEmailForm = new FormGroup({
    oldEmail: new FormControl(),
    newEmail: new FormControl()
  });

  private oldEmail = '';
  private newEmail = '';

  constructor(
    public dialogRef: MatDialogRef<EditEmailDialogComponent>, 
    private usersService: UsersService
  ) {
    this.editEmailForm.valueChanges.subscribe((form: any) => {
      this.oldEmail = form.oldEmail;
      this.newEmail = form.newEmail;
    });
  }

  public editEmail(): void {
    this.usersService.editEmail(this.oldEmail, this.newEmail);
    this.onNoClick();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
