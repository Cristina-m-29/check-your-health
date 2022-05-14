import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  public onChooseUserType = true;
  public onRegisterPage = false;

  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: any) => {
        this.onChooseUserType = event.url === '/';
        this.onRegisterPage = event.url.includes('register');
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
