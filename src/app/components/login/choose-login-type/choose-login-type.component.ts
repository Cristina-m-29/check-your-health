import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-choose-login-type',
  templateUrl: './choose-login-type.component.html',
  styleUrls: ['./choose-login-type.component.sass']
})
export class ChooseLoginTypeComponent {
  constructor(private authService: AuthService) {}

  public selectUserType(userType: string): void {
    this.authService.setUserType(userType);
  }
}
