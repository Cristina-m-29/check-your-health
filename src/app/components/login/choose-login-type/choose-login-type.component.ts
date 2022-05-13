import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-choose-login-type',
  templateUrl: './choose-login-type.component.html',
  styleUrls: ['./choose-login-type.component.sass']
})
export class ChooseLoginTypeComponent {
  public userTypes = ['pacient', 'medic', 'farmacie', 'medic-specialist'];

  constructor(private authService: AuthService) {}

  public removeDash(value: string): string {
    return value.substring(value.indexOf('-') + 1)
  }

  public selectUserType(userType: string): void {
    this.authService.setUserType(userType);
  }
}
