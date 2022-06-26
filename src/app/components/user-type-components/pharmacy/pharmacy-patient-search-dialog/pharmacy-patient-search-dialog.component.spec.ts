import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPatientSearchDialogComponent } from './pharmacy-patient-search-dialog.component';

describe('PharmacyPatientSearchDialogComponent', () => {
  let component: PharmacyPatientSearchDialogComponent;
  let fixture: ComponentFixture<PharmacyPatientSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyPatientSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyPatientSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
