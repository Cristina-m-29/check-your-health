import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDashboardAppointmentsComponent } from './patient-dashboard-appointments.component';

describe('PatientDashboardAppointmentsComponent', () => {
  let component: PatientDashboardAppointmentsComponent;
  let fixture: ComponentFixture<PatientDashboardAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDashboardAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDashboardAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
