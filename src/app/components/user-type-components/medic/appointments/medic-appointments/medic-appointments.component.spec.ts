import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicAppointmentsComponent } from './medic-appointments.component';

describe('MedicAppointmentsComponent', () => {
  let component: MedicAppointmentsComponent;
  let fixture: ComponentFixture<MedicAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
