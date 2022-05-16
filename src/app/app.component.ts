import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as moment from 'moment';
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
        this.showMainNavbar = event.url.includes('dashboard') || event.url.includes('cont') || options.menuList.find(option => event.url.includes(option));
      });
    // console.log(moment.utc().unix());
    // console.log(moment.utc().hours(8).unix());
    // const date = moment.unix(1652400000);
    // console.log(date);
    // console.log(date.hours(8).minutes(0).seconds(0).milliseconds(0));
    // console.log(date.toLocaleString());
    // console.log(moment().toLocaleString())
  }
}
