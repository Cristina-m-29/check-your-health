import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicAddPrescriptionComponent } from './medic-add-prescription.component';

describe('MedicAddPrescriptionComponent', () => {
  let component: MedicAddPrescriptionComponent;
  let fixture: ComponentFixture<MedicAddPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicAddPrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicAddPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
