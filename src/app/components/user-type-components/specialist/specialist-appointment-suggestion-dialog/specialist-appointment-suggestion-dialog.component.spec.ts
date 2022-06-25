import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistAppointmentSuggestionDialogComponent } from './specialist-appointment-suggestion-dialog.component';

describe('SpecialistAppointmentSuggestionDialogComponent', () => {
  let component: SpecialistAppointmentSuggestionDialogComponent;
  let fixture: ComponentFixture<SpecialistAppointmentSuggestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistAppointmentSuggestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistAppointmentSuggestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
