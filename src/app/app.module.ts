import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseLoginTypeComponent } from './components/auth/login/choose-login-type/choose-login-type.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { BaseRegisterComponent } from './components/auth/register/base-register/base-register.component';
import { MedicRegisterComponent } from './components/auth/register/medic-register/medic-register.component';
import { PatientRegisterComponent } from './components/auth/register/patient-register/patient-register.component';
import { PharmacyRegisterComponent } from './components/auth/register/pharmacy-register/pharmacy-register.component';
import { SpecialistRegisterComponent } from './components/auth/register/specialist-register/specialist-register.component';
import { MedicDashboardHomeComponent } from './components/dashboards/medic-dashboard/menu-tabs/medic-dashboard-home/medic-dashboard-home.component';
import { PatientDashboardHomeComponent } from './components/dashboards/patient-dashboard/menu-tabs/patient-dashboard-home/patient-dashboard-home.component';
import { PatientDashboardPrescriptionsComponent } from './components/dashboards/patient-dashboard/menu-tabs/patient-dashboard-prescriptions/patient-dashboard-prescriptions.component';
import { PatientDashboardAppointmentsComponent } from './components/dashboards/patient-dashboard/parts/patient-dashboard-appointments/patient-dashboard-appointments.component';
import { PatientDashboardMedicComponent } from './components/dashboards/patient-dashboard/parts/patient-dashboard-medic/patient-dashboard-medic.component';
import { PharmacyDashboardHomeComponent } from './components/dashboards/pharmacy-dashboard/menu-tabs/pharmacy-dashboard-home/pharmacy-dashboard-home.component';
import { SpecialistDashboardHomeComponent } from './components/dashboards/specialist-dashboard/menu-tabs/specialist-dashboard-home/specialist-dashboard-home.component';
import { UserComponent } from './components/dashboards/user/user.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { SideNavbarComponent } from './components/navigation/side-navbar/side-navbar.component';
import { GoogleMapComponent } from './components/utils/google-map/google-map.component';
import { LoadingScreenComponent } from './components/utils/loading-screen/loading-screen.component';
import { NotificationsComponent } from './components/utils/notifications/notifications.component';
import { UpperCaseFirstLetterPipe } from './pipes/upper-case-first-letter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BaseRegisterComponent,
    ChooseLoginTypeComponent,
    GoogleMapComponent,
    LoadingScreenComponent,
    LoginComponent,
    MedicDashboardHomeComponent,
    MedicRegisterComponent,
    NavbarComponent,
    NotificationsComponent,
    PatientDashboardHomeComponent,
    PatientDashboardPrescriptionsComponent,
    PatientDashboardAppointmentsComponent,
    PatientDashboardMedicComponent,
    PatientRegisterComponent,
    PharmacyDashboardHomeComponent,
    PharmacyRegisterComponent,
    SideNavbarComponent,
    SpecialistDashboardHomeComponent,
    SpecialistRegisterComponent,
    UpperCaseFirstLetterPipe,
    UserComponent,
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
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
