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
  {
    path: '',
    component: ChooseLoginTypeComponent,
  },
  {
    path: 'login/:userType',
    component: LoginComponent
  },
  {
    path: 'register/:userType',
    component: BaseRegisterComponent
  },
  // dashboards
  {
    path: 'dashboard/medic',
    component: MedicDashboardComponent
  },
  {
    path: 'dashboard/specialist',
    component: SpecialistDashboardComponent
  },
  {
    path: 'dashboard/pacient',
    component: PacientDashboardComponent
  },
  {
    path: 'dashboard/farmacy',
    component: FarmacyDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
