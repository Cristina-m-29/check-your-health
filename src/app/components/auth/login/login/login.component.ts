import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  public userType: string | null = this.authService.getUserType();

  public loginForm = new FormGroup({
    phoneNumber: new FormControl(),
    email: new FormControl(),
    pass: new FormControl()
  });

  constructor(private authService: AuthService, private router: Router) { }

  public backToChooseUserType(): void {
    this.authService.setUserType(null);
    this.router.navigateByUrl('');
  }

  public login(): void {
    // to do
    this.authService.navigateToDashboard();
  }
}