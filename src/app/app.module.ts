import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmedAppointmentsComponent } from './components/confirmed-appointments/confirmed-appointments.component';
import {
  FarmacyDashboardComponent,
} from './components/dashboards/farmacy-dashboard/farmacy-dashboard/farmacy-dashboard.component';
import {
  NewPrescriptionsComponent,
} from './components/dashboards/farmacy-dashboard/new-prescriptions/new-prescriptions.component';
import {
  PrescriptionsForPickupComponent,
} from './components/dashboards/farmacy-dashboard/prescriptions-for-pickup/prescriptions-for-pickup.component';
import {
  PrescriptionsInProgressComponent,
} from './components/dashboards/farmacy-dashboard/prescriptions-in-progress/prescriptions-in-progress.component';
import { MedicDashboardComponent } from './components/dashboards/medic-dashboard/medic-dashboard/medic-dashboard.component';
import { MyPatientsComponent } from './components/dashboards/medic-dashboard/my-patients/my-patients.component';
import { PrescriptionsComponent } from './components/dashboards/medic-dashboard/prescriptions/prescriptions.component';
import {
  MyDiagnoasticsComponent,
} from './components/dashboards/pacient-dashboard/my-diagnoastics/my-diagnoastics.component';
import { MyMedicComponent } from './components/dashboards/pacient-dashboard/my-medic/my-medic.component';
import {
  MyPrescriptionsComponent,
} from './components/dashboards/pacient-dashboard/my-prescriptions/my-prescriptions.component';
import {
  PacientDashboardComponent,
} from './components/dashboards/pacient-dashboard/pacient-dashboard/pacient-dashboard.component';
import { AppointmentsComponent } from './components/dashboards/specialist-dashboard/appointments/appointments.component';
import { MyPacientsComponent } from './components/dashboards/specialist-dashboard/my-pacients/my-pacients.component';
import {
  SpecialistDashboardComponent,
} from './components/dashboards/specialist-dashboard/specialist-dashboard/specialist-dashboard.component';
import { ChooseLoginTypeComponent } from './components/login/choose-login-type/choose-login-type.component';
import { LoginComponent } from './components/login/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { BaseRegisterComponent } from './components/register/base-register/base-register.component';
import { FarmacyRegisterComponent } from './components/register/farmacy-register/farmacy-register.component';
import { MedicRegisterComponent } from './components/register/medic-register/medic-register.component';
import { PacientRegisterComponent } from './components/register/pacient-register/pacient-register.component';
import { SpecialistRegisterComponent } from './components/register/specialist-register/specialist-register.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { UserComponent } from './components/user/user.component';
import { UpperCaseFirstLetterPipe } from './pipes/upper-case-first-letter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    BaseRegisterComponent,
    ChooseLoginTypeComponent,
    ConfirmedAppointmentsComponent,
    FarmacyDashboardComponent,
    FarmacyRegisterComponent,
    LoginComponent,
    MedicDashboardComponent,
    MedicRegisterComponent,
    MyDiagnoasticsComponent,
    MyMedicComponent,
    MyPacientsComponent,
    MyPatientsComponent,
    MyPrescriptionsComponent,
    NavbarComponent,
    NewPrescriptionsComponent,
    NotificationsComponent,
    PacientDashboardComponent,
    PacientRegisterComponent,
    PrescriptionsComponent,
    PrescriptionsForPickupComponent,
    PrescriptionsInProgressComponent,
    SideNavbarComponent,
    SpecialistDashboardComponent,
    SpecialistRegisterComponent,
    UserComponent,
    UpperCaseFirstLetterPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
