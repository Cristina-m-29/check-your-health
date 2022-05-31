import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicRefuseAppointmentDialogComponent } from './medic-refuse-appointment-dialog.component';

describe('MedicRefuseAppointmentDialogComponent', () => {
  let component: MedicRefuseAppointmentDialogComponent;
  let fixture: ComponentFixture<MedicRefuseAppointmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicRefuseAppointmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicRefuseAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
