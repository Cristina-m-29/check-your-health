import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MedicDashboardComponent } from './components/dashboards/medic-dashboard/medic-dashboard/medic-dashboard.component';
import {
  MyDiagnoasticsComponent,
} from './components/dashboards/pacient-dashboard/my-diagnoastics/my-diagnoastics.component';
import { MyMedicComponent } from './components/dashboards/pacient-dashboard/my-medic/my-medic.component';
import {
  MyPrescriptionsComponent,
} from './components/dashboards/pacient-dashboard/my-prescriptions/my-prescriptions.component';
import { ChooseLoginTypeComponent } from './components/login/choose-login-type/choose-login-type.component';
import { LoginComponent } from './components/login/login/login.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { BaseRegisterComponent } from './components/register/base-register/base-register.component';
import { UserComponent } from './components/user/user.component';

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
        component: MedicDashboardComponent
      }
    ]
  },
  {
    path: 'dashboard/specialist',
    // to add menu items
    children: [
      {
        path: '**',
        component: MedicDashboardComponent
      }
    ]
  },
  {
    path: 'dashboard/pacient',
    // to add menu items
    children: [
      {
        path: 'diagnostice',
        component: MyDiagnoasticsComponent
      },
      {
        path: 'prescriptii',
        component: MyPrescriptionsComponent
      },
      {
        path: 'medic',
        component: MyMedicComponent,
      },
      {
        path: '**',
        redirectTo: '/dashboard/pacient/diagnostics'
      }
    ]
  },
  {
    path: 'dashboard/farmacie',
    // to add menu items
    children: [
      {
        path: '**',
        component: MedicDashboardComponent
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
