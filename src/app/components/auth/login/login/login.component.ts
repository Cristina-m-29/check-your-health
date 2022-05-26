import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login/loginRequest';
import { LoginResponse } from 'src/app/models/login/loginResponse';
import { UserType } from 'src/app/models/userType';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  public userType: UserType | null = this.authService.getUserType();

  public loginForm = new FormGroup({
    identity: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthService, private router: Router) { }

  public backToChooseUserType(): void {
    this.authService.setUserType(null);
    this.router.navigateByUrl('');
  }

  public login(): void {
    if (this.userType) {
      const loginRequest: LoginRequest = new LoginRequest(this.loginForm.value.identity, this.loginForm.value.password, this.userType);
      this.authService.login(loginRequest).subscribe((loginResponse: LoginResponse) => {
        if (loginResponse.err) {
          return;
        }
        this.authService.navigateToDashboard();
      });
    }
  }
}
