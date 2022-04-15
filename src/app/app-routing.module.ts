import { RouterModule, Routes } from '@angular/router';

import { BaseRegisterComponent } from './components/register/base-register/base-register.component';
import { ChooseLoginTypeComponent } from './components/login/choose-login-type/choose-login-type.component';
import { FarmacyDashboardComponent } from './components/dashboards/farmacy-dashboard/farmacy-dashboard/farmacy-dashboard.component';
import { LoginComponent } from './components/login/login/login.component';
import { MedicDashboardComponent } from './components/dashboards/medic-dashboard/medic-dashboard/medic-dashboard.component';
import { NgModule } from '@angular/core';
import { PacientDashboardComponent } from './components/dashboards/pacient-dashboard/pacient-dashboard/pacient-dashboard.component';
import { SpecialistDashboardComponent } from './components/dashboards/specialist-dashboard/specialist-dashboard/specialist-dashboard.component';

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
    path: 'register-medic',
    component: BaseRegisterComponent
  },
  {
    path: 'register-specialist',
    component: BaseRegisterComponent
  },
  {
    path: 'register-pacient',
    component: BaseRegisterComponent
  },
  {
    path: 'register-farmacy',
    component: BaseRegisterComponent
  },
  // dashboards
  {
    path: 'medic-dashboard',
    component: MedicDashboardComponent
  },
  {
    path: 'specialist-dashboard',
    component: SpecialistDashboardComponent
  },
  {
    path: 'pacient-dashboard',
    component: PacientDashboardComponent
  },
  {
    path: 'farmacy-dashboard',
    component: FarmacyDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
