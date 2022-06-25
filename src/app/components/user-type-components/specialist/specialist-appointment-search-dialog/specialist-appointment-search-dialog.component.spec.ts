import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistAppointmentSearchDialogComponent } from './specialist-appointment-search-dialog.component';

describe('SpecialistAppointmentSearchDialogComponent', () => {
  let component: SpecialistAppointmentSearchDialogComponent;
  let fixture: ComponentFixture<SpecialistAppointmentSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistAppointmentSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistAppointmentSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
