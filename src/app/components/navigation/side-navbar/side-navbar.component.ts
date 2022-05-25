import { userTypes } from './../../../models/userType';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Menu, menus, options } from 'src/app/models/menu';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.sass']
})
export class SideNavbarComponent implements OnInit {
  public userType: string | null = this.authService.getUserType();
  public menus = menus;
  public options = options;
  public selectedMenuItem: string = this.menus.find(menu => menu.userType === this.userType)?.menuList[0] || '';

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    this.initSideNav();
  }

  public goHome(): void {
    this.authService.setUserType(null);
    this.router.navigateByUrl('');
  }

  public goTo(menu: Menu, selectedMenuItem: string): void {
    this.selectedMenuItem = this.getUrlItemOfMenuList(menu, selectedMenuItem);

    if (this.selectedMenuItem === 'iesire') {
      // to do
      this.router.navigateByUrl('');
      return;
    }

    if (options.menuList.find(option => option === this.selectedMenuItem) || selectedMenuItem === 'profil') {
      this.router.navigateByUrl(this.selectedMenuItem);
      return;
    }

    this.router.navigateByUrl(`${this.userType}/${this.selectedMenuItem}`);
  }

  private getUrlItemOfMenuList(menu: Menu, item: string): string {
    return menu.menuList[menu.translateMenuList.indexOf(item)]
  }

  private initSideNav(): void {
    const splittedUrl = this.router.url.split('/');
    const userType = splittedUrl[1];
    const selectedMenuItem = splittedUrl[2];
    const menu = menus.find((menu: Menu) => menu.userType === userType) || menus[0];
    this.selectedMenuItem = menu.menuList.find((item: string) => item === selectedMenuItem) || menu.menuList[0];
  }
}
