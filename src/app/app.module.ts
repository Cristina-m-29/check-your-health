import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppointmentsComponent } from './components/dashboards/specialist-dashboard/appointments/appointments.component';
import { BaseRegisterComponent } from './components/register/base-register/base-register.component';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmedAppointmentsComponent } from './components/confirmed-appointments/confirmed-appointments.component';
import { FarmacyDashboardComponent } from './components/dashboards/farmacy-dashboard/farmacy-dashboard/farmacy-dashboard.component';
import { FarmacyRegisterComponent } from './components/register/farmacy-register/farmacy-register.component';
import { LoginComponent } from './components/login/login.component';
import { MedicDashboardComponent } from './components/dashboards/medic-dashboard/medic-dashboard/medic-dashboard.component';
import { MedicRegisterComponent } from './components/register/medic-register/medic-register.component';
import { MyMedicComponent } from './components/dashboards/pacient-dashboard/my-medic/my-medic.component';
import { MyPacientsComponent } from './components/dashboards/specialist-dashboard/my-pacients/my-pacients.component';
import { MyPatientsComponent } from './components/dashboards/medic-dashboard/my-patients/my-patients.component';
import { MyPrescriptionsComponent } from './components/dashboards/pacient-dashboard/my-prescriptions/my-prescriptions.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewPrescriptionsComponent } from './components/dashboards/farmacy-dashboard/new-prescriptions/new-prescriptions.component';
import { NgModule } from '@angular/core';
import { PacientDashboardComponent } from './components/dashboards/pacient-dashboard/pacient-dashboard/pacient-dashboard.component';
import { PacientRegisterComponent } from './components/register/pacient-register/pacient-register.component';
import { PrescriptionsComponent } from './components/dashboards/medic-dashboard/prescriptions/prescriptions.component';
import { PrescriptionsForPickupComponent } from './components/dashboards/farmacy-dashboard/prescriptions-for-pickup/prescriptions-for-pickup.component';
import { PrescriptionsInProgressComponent } from './components/dashboards/farmacy-dashboard/prescriptions-in-progress/prescriptions-in-progress.component';
import { SpecialistDashboardComponent } from './components/dashboards/specialist-dashboard/specialist-dashboard/specialist-dashboard.component';
import { SpecialistRegisterComponent } from './components/register/specialist-register/specialist-register.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    BaseRegisterComponent,
    ConfirmedAppointmentsComponent,
    FarmacyDashboardComponent,
    FarmacyRegisterComponent,
    LoginComponent,
    MedicDashboardComponent,
    MedicRegisterComponent,
    MyMedicComponent,
    MyPacientsComponent,
    MyPatientsComponent,
    MyPrescriptionsComponent,
    NavbarComponent,
    NewPrescriptionsComponent,
    PacientDashboardComponent,
    PacientRegisterComponent,
    PrescriptionsComponent,
    PrescriptionsForPickupComponent,
    PrescriptionsInProgressComponent,
    SpecialistDashboardComponent,
    SpecialistRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
