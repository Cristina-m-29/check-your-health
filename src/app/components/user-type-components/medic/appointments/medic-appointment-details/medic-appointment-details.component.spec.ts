import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicAppointmentDetailsComponent } from './medic-appointment-details.component';

describe('MedicAppointmentDetailsComponent', () => {
  let component: MedicAppointmentDetailsComponent;
  let fixture: ComponentFixture<MedicAppointmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicAppointmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicAppointmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
