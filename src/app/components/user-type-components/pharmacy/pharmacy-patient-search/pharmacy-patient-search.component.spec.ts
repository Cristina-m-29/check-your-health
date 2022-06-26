import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPatientSearchComponent } from './pharmacy-patient-search.component';

describe('PharmacyPatientSearchComponent', () => {
  let component: PharmacyPatientSearchComponent;
  let fixture: ComponentFixture<PharmacyPatientSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyPatientSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyPatientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
