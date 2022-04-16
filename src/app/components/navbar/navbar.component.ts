import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public onChooseUserType = true;
  public onRegisterPage = false;
  public loggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.onChooseUserType = event.url === '/';
        this.onRegisterPage = event.url.includes('register') && !this.loggedIn;
      });
  }

  public goHome(): void {
    this.authService.setUserType(null);
    this.router.navigateByUrl('');
  }

  public goToRegister(): void {
    this.router.navigateByUrl(`register/${this.authService.getUserType()}`);
  }

  public goToLogin(): void {
    this.router.navigateByUrl(`login/${this.authService.getUserType()}`);
  };

}
