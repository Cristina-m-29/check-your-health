import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { options } from './models/menu';

@Component({
  selector: 'cyh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public showMainNavbar = false;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showMainNavbar = event.url.includes('dashboard') || options.menuList.find(option => event.url.includes(option));
      });
  }
}
