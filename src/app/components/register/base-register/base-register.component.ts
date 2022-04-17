import { Component } from '@angular/core';
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

  constructor(private authService: AuthService, private router: Router) {}

  public backToChooseUserType(): void {
    this.authService.setUserType(null);
    this.router.navigateByUrl('');
  }

  public continueRegister(): void {
    this.showBaseRegisterView = false;
  }

  public goBackToBaseRegister() {
    this.showBaseRegisterView = true;
  }

}
