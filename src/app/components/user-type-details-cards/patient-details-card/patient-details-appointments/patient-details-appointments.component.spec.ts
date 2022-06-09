import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsAppointmentsComponent } from './patient-details-appointments.component';

describe('PatientDetailsAppointmentsComponent', () => {
  let component: PatientDetailsAppointmentsComponent;
  let fixture: ComponentFixture<PatientDetailsAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailsAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailsAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
