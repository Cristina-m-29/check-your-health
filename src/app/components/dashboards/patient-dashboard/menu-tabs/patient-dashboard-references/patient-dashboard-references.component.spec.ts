/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PatientDashboardReferencesComponent } from './patient-dashboard-references.component';

describe('PatientDashboardReferencesComponent', () => {
  let component: PatientDashboardReferencesComponent;
  let fixture: ComponentFixture<PatientDashboardReferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDashboardReferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDashboardReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
