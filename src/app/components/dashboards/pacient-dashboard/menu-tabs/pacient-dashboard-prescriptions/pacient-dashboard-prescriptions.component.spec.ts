/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PacientDashboardPrescriptionsComponent } from './pacient-dashboard-prescriptions.component';

describe('PacientDashboardPrescriptionsComponent', () => {
  let component: PacientDashboardPrescriptionsComponent;
  let fixture: ComponentFixture<PacientDashboardPrescriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientDashboardPrescriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientDashboardPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
