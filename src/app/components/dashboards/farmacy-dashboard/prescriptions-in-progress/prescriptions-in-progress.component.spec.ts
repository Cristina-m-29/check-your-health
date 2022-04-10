import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionsInProgressComponent } from './prescriptions-in-progress.component';

describe('PrescriptionsInProgressComponent', () => {
  let component: PrescriptionsInProgressComponent;
  let fixture: ComponentFixture<PrescriptionsInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionsInProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionsInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
