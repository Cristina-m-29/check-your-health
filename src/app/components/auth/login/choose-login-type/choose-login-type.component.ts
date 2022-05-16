import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserType } from 'src/app/models/userType'

@Component({
  selector: 'cyh-choose-login-type',
  templateUrl: './choose-login-type.component.html',
  styleUrls: ['./choose-login-type.component.sass']
})
export class ChooseLoginTypeComponent {

  constructor(private authService: AuthService) {}

  public removeDash(value: string): string {
    return value.substring(value.indexOf('-') + 1)
  }

  public selectUserType(userType: UserType): void {
    this.authService.setUserType(userType);
  }
}
