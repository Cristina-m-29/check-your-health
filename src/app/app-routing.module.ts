import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChooseLoginTypeComponent } from './components/auth/login/choose-login-type/choose-login-type.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { BaseRegisterComponent } from './components/auth/register/base-register/base-register.component';
import {
  MedicDashboardHomeComponent,
} from './components/dashboards/medic-dashboard/menu-tabs/medic-dashboard-home/medic-dashboard-home.component';
import {
  PacientDashboardHomeComponent,
} from './components/dashboards/pacient-dashboard/menu-tabs/pacient-dashboard-home/pacient-dashboard-home.component';
import {
  PacientDashboardPrescriptionsComponent,
} from './components/dashboards/pacient-dashboard/menu-tabs/pacient-dashboard-prescriptions/pacient-dashboard-prescriptions.component';
import {
  PharmacyDashboardHomeComponent,
} from './components/dashboards/pharmacy-dashboard/menu-tabs/pharmacy-dashboard-home/pharmacy-dashboard-home.component';
import {
  SpecialistDashboardHomeComponent,
} from './components/dashboards/specialist-dashboard/menu-tabs/specialist-dashboard-home/specialist-dashboard-home.component';
import { UserComponent } from './components/dashboards/user/user.component';
import { NotificationsComponent } from './components/utils/notifications/notifications.component';

const routes: Routes = [
  // login
  {
    path: '',
    component: ChooseLoginTypeComponent,
  },
  {
    path: 'login/:userType',
    component: LoginComponent
  },
  // register
  {
    path: 'register/:userType',
    component: BaseRegisterComponent
  },
  // dashboards
  {
    path: 'dashboard/medic',
    // to add menu items
    children: [
      {
        path: '**',
        component: MedicDashboardHomeComponent
      }
    ]
  },
  {
    path: 'dashboard/specialist',
    // to add menu items
    children: [
      {
        path: '**',
        component: SpecialistDashboardHomeComponent
      }
    ]
  },
  {
    path: 'dashboard/pacient',
    // to add menu items
    children: [
      {
        path: 'home',
        component: PacientDashboardHomeComponent,
      },
      {
        path: 'prescriptii',
        component: PacientDashboardPrescriptionsComponent
      },
      {
        path: '**',
        redirectTo: '/dashboard/pacient/home'
      }
    ]
  },
  {
    path: 'dashboard/farmacie',
    // to add menu items
    children: [
      {
        path: '**',
        component: PharmacyDashboardHomeComponent
      }
    ]
  },
  // other
  {
    path: 'notificari',
    component: NotificationsComponent
  },
  {
    path: 'cont',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
