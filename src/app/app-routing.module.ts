import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseLoginTypeComponent } from './components/auth/login/choose-login-type/choose-login-type.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { BaseRegisterComponent } from './components/auth/register/base-register/base-register.component';
import { UserComponent } from './components/user-profile/user.component';
import { MedicAppointmentDetailsComponent } from './components/user-type-components/medic/appointments/medic-appointment-details/medic-appointment-details.component';
import { MedicHomeComponent } from './components/user-type-components/medic/medic-home/medic-home.component';
import { MedicPatientsComponent } from './components/user-type-components/medic/medic-patients/medic-patients.component';
import { PatientAppointmentDetailsComponent } from './components/user-type-components/patient/appointments/patient-appointment-details/patient-appointment-details.component';
import {
  PatientHomeComponent
} from './components/user-type-components/patient/patient-home/patient-home.component';
import {
  PatientPrescriptionsComponent
} from './components/user-type-components/patient/prescriptions/patient-prescriptions/patient-prescriptions.component';
import {
  PatientReferencesComponent
} from './components/user-type-components/patient/references/patient-references/patient-references.component';
import { NotificationsComponent } from './components/utils/notifications/notifications.component';
import { AuthGuard } from './guards/auth.guard';

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
    path: 'medic',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: MedicHomeComponent
      },
      {
        path: 'patients',
        component: MedicPatientsComponent
      },
      {
        path: 'appointment',
        component: MedicAppointmentDetailsComponent
      },
      {
        path: 'appointment/create',
        component: MedicAppointmentDetailsComponent
      },
      {
        path: '**',
        redirectTo: '/medic/home'
      }
    ]
  },
  // {
  //   path: 'specialist',
  //   // to add menu items
  //   children: [
  //     {
  //       path: '**',
  //       component:
  //     }
  //   ]
  // },
  {
    path: 'patient',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: PatientHomeComponent,
      },
      {
        path: 'references',
        component: PatientReferencesComponent,
      },
      {
        path: 'prescriptions',
        component: PatientPrescriptionsComponent
      },
      {
        path: 'appointment',
        component: PatientAppointmentDetailsComponent
      },
      {
        path: 'appointment/create',
        component: PatientAppointmentDetailsComponent
      },
      {
        path: '**',
        redirectTo: '/pacient/home'
      }
    ]
  },
  // {
  //   path: 'pharmacy',
  //   // to add menu items
  //   children: [
  //     {
  //       path: '**',
  //       component:
  //     }
  //   ]
  // },
  // other
  {
    path: 'notificari',
    canActivate: [AuthGuard],
    component: NotificationsComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
