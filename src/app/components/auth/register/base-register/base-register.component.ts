import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-base-register',
  templateUrl: './base-register.component.html',
  styleUrls: ['./base-register.component.sass']
})
export class BaseRegisterComponent {
  public showBaseRegisterView = true;
  public userType = this.authService.getUserType();

  public baseRegisterForm = new FormGroup({
    name: new FormControl(),
    identity: new FormControl(),
    password: new FormControl(),
  });

  constructor(private authService: AuthService, private router: Router) {}

  public backToChooseUserType(): void {
    this.authService.setUserType(null);
    this.router.navigateByUrl('');
  }

  public continueRegister(): void {
    this.showBaseRegisterView = false;
  }

  public register(event: any): void {
    const baseForm: {[key: string]: any} = {};
    Object.keys(this.baseRegisterForm.value).forEach((key: string) => {
      baseForm[key] = this.baseRegisterForm.value[key];
    })

    const form = <FormGroup>event;
    Object.keys(form.value).forEach((key: string) => {
      baseForm[key] = form.value[key];
    });

    // to do
    this.authService.navigateToDashboard();
  }

  public goBackToBaseRegister() {
    this.showBaseRegisterView = true;
  }

}
