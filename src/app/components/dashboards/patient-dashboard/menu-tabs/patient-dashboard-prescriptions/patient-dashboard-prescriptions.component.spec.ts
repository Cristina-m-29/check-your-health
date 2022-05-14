
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDashboardPrescriptionsComponent } from './patient-dashboard-prescriptions.component';

describe('PatientDashboardPrescriptionsComponent', () => {
  let component: PatientDashboardPrescriptionsComponent;
  let fixture: ComponentFixture<PatientDashboardPrescriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDashboardPrescriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDashboardPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
