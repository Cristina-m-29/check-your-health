import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafePipeModule } from 'safe-pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseLoginTypeComponent } from './components/auth/login/choose-login-type/choose-login-type.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { BaseRegisterComponent } from './components/auth/register/base-register/base-register.component';
import { MedicRegisterComponent } from './components/auth/register/medic-register/medic-register.component';
import { PatientRegisterComponent } from './components/auth/register/patient-register/patient-register.component';
import { PharmacyRegisterComponent } from './components/auth/register/pharmacy-register/pharmacy-register.component';
import { SpecialistRegisterComponent } from './components/auth/register/specialist-register/specialist-register.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { SideNavbarComponent } from './components/navigation/side-navbar/side-navbar.component';
import { UserComponent } from './components/user-profile/user.component';
import { PatientAppointmentDetailsComponent } from './components/user-type-components/patient/appointments/patient-appointment-details/patient-appointment-details.component';
import { PatientAppointmentsComponent } from './components/user-type-components/patient/appointments/patient-appointments/patient-appointments.component';
import { PatientHomeComponent } from './components/user-type-components/patient/patient-home/patient-home.component';
import { PatientPrescriptionsComponent } from './components/user-type-components/patient/prescriptions/patient-prescriptions/patient-prescriptions.component';
import { PatientReferenceDetailsComponent } from './components/user-type-components/patient/references/patient-reference-details/patient-reference-details.component';
import { PatientReferencesComponent } from './components/user-type-components/patient/references/patient-references/patient-references.component';
import { MedicDetailsCardComponent } from './components/user-type-details-cards/medic-details-card/medic-details-card.component';
import { PatientDetailsCardComponent } from './components/user-type-details-cards/patient-details-card/patient-details-card.component';
import { PharmacyDetailsCardComponent } from './components/user-type-details-cards/pharmacy-details-card/pharmacy-details-card.component';
import { CustomDateAdapter } from './components/utils/custom-date-adapter.component';
import { GoogleMapComponent } from './components/utils/google-map/google-map.component';
import { LoadingScreenComponent } from './components/utils/loading-screen/loading-screen.component';
import { NotificationsComponent } from './components/utils/notifications/notifications.component';
import { InterceptorInterceptor } from './interceptors/interceptor.interceptor';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { UpperCaseFirstLetterPipe } from './pipes/upper-case-first-letter.pipe';
import { PatientPrescriptionDetailsComponent } from './components/user-type-components/patient/prescriptions/patient-prescription-details/patient-prescription-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseRegisterComponent,
    ChooseLoginTypeComponent,
    FormatTimePipe,
    GoogleMapComponent,
    LoadingScreenComponent,
    LoginComponent,
    MedicDetailsCardComponent,
    MedicRegisterComponent,
    NavbarComponent,
    NotificationsComponent,
    PatientAppointmentDetailsComponent,
    PatientAppointmentsComponent,
    PatientDetailsCardComponent,
    PatientHomeComponent,
    PatientPrescriptionsComponent,
    PatientReferenceDetailsComponent,
    PatientReferencesComponent,
    PatientRegisterComponent,
    PharmacyDetailsCardComponent,
    PharmacyRegisterComponent,
    SideNavbarComponent,
    SpecialistRegisterComponent,
    UpperCaseFirstLetterPipe,
    UserComponent,
    PatientPrescriptionDetailsComponent,
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
    MatCardModule,
    SafePipeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
