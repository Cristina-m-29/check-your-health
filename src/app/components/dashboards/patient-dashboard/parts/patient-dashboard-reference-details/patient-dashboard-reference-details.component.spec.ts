/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PatientDashboardReferenceDetailsComponent } from './patient-dashboard-reference-details.component';

describe('PatientDashboardReferenceDetailsComponent', () => {
  let component: PatientDashboardReferenceDetailsComponent;
  let fixture: ComponentFixture<PatientDashboardReferenceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDashboardReferenceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDashboardReferenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
