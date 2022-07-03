import { userTypes } from './models/userType';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { options } from './models/menu';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'cyh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public showMainNavbar = false;

  constructor(private router: Router, private notificationsService: NotificationsService) {}

  public ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const userType = event.url.split('/')[1];
        this.showMainNavbar = userTypes.includes(userType) || userType === 'profile' || !!options.menuList.find(option => event.url.includes(option));
      });
  }
}
