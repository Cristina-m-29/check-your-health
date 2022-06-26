import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicDetailsCardComponent } from './patient-medic-details-card.component';

describe('PatientMedicDetailsCardComponent', () => {
  let component: PatientMedicDetailsCardComponent;
  let fixture: ComponentFixture<PatientMedicDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMedicDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMedicDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
