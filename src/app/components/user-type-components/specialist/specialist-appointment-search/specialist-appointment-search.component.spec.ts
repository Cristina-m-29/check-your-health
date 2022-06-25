import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistAppointmentSearchComponent } from './specialist-appointment-search.component';

describe('SpecialistAppointmentSearchComponent', () => {
  let component: SpecialistAppointmentSearchComponent;
  let fixture: ComponentFixture<SpecialistAppointmentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistAppointmentSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistAppointmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
