import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu, menus, options } from 'src/app/models/menu';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'cyh-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.sass']
})
export class SideNavbarComponent implements OnInit {
  public userType = this.authService.getUserType();
  public menus = menus;
  public options = options;
  public selectedMenuItem: string = this.menus.find(menu => menu.userType === this.userType)?.menuList[0] || '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private cd: ChangeDetectorRef,
    private notificationsService: NotificationsService,
  ) {}

  public ngOnInit(): void {
    this.startListeningForNotifications();
    this.getNotifications();
    this.initSideNav();

    this.notificationsService.gotNewNotifications.subscribe(() => {
      this.getNotifications();
    });
  }

  public goHome(): void {
    this.authService.setUserType(null);
    this.router.navigateByUrl('');
  }

  public goTo(menu: Menu, selectedMenuItem: string): void {
    this.selectedMenuItem = this.getUrlItemOfMenuList(menu, selectedMenuItem);
    this.cd.detectChanges();

    if (this.selectedMenuItem === 'iesire') {
      this.authService.logout();
      return;
    }

    if (this.selectedMenuItem === 'notificari') {
      console.log('here'); // to do
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

  private getNotifications(): void {
    this.notificationsService.getNotifications(); // to do
  }

  private startListeningForNotifications(): void {
    this.notificationsService.startListeningForNotifications();
  }
}
