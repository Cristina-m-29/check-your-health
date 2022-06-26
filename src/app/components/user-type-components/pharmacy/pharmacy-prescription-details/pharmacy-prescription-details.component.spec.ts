import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPrescriptionDetailsComponent } from './pharmacy-prescription-details.component';

describe('PharmacyPrescriptionDetailsComponent', () => {
  let component: PharmacyPrescriptionDetailsComponent;
  let fixture: ComponentFixture<PharmacyPrescriptionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyPrescriptionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyPrescriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
