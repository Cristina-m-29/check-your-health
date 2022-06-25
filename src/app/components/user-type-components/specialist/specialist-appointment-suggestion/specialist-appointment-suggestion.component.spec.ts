import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistAppointmentSuggestionComponent } from './specialist-appointment-suggestion.component';

describe('SpecialistAppointmentSuggestionComponent', () => {
  let component: SpecialistAppointmentSuggestionComponent;
  let fixture: ComponentFixture<SpecialistAppointmentSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistAppointmentSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistAppointmentSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
