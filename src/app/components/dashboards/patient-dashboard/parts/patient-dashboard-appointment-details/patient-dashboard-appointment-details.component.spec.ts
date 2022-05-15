/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PatientDashboardAppointmentDetailsComponent } from './patient-dashboard-appointment-details.component';

describe('PatientDashboardAppointmentDetailsComponent', () => {
  let component: PatientDashboardAppointmentDetailsComponent;
  let fixture: ComponentFixture<PatientDashboardAppointmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDashboardAppointmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDashboardAppointmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
