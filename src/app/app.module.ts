import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ChooseLoginTypeComponent } from './components/auth/login/choose-login-type/choose-login-type.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { BaseRegisterComponent } from './components/auth/register/base-register/base-register.component';
import { FarmacyRegisterComponent } from './components/auth/register/farmacy-register/farmacy-register.component';
import { MedicRegisterComponent } from './components/auth/register/medic-register/medic-register.component';
import { PacientRegisterComponent } from './components/auth/register/pacient-register/pacient-register.component';
import { SpecialistRegisterComponent } from './components/auth/register/specialist-register/specialist-register.component';
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
import { UserComponent } from './components/dashboards/user/user.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { SideNavbarComponent } from './components/navigation/side-navbar/side-navbar.component';
import { GoogleMapComponent } from './components/utils/google-map/google-map.component';
import { NotificationsComponent } from './components/utils/notifications/notifications.component';
import { UpperCaseFirstLetterPipe } from './pipes/upper-case-first-letter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    BaseRegisterComponent,
    ChooseLoginTypeComponent,
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
    GoogleMapComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
