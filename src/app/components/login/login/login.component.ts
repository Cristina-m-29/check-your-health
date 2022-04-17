import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { menus } from 'src/app/models/menu';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  private userType: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  public backToChooseUserType(): void {
    this.authService.setUserType(null);
    this.router.navigateByUrl('');
  }

  public login(): void {
    // to do
    this.userType = this.authService.getUserType();
    const tab = menus.find(menu => menu.userType === this.userType)?.menuList[0];
    this.router.navigateByUrl(`dashboard/${this.userType}/${tab}`);
  }
}
