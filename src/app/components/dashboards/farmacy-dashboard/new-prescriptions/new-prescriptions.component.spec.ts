import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrescriptionsComponent } from './new-prescriptions.component';

describe('NewPrescriptionsComponent', () => {
  let component: NewPrescriptionsComponent;
  let fixture: ComponentFixture<NewPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPrescriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
