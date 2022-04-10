import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionsForPickupComponent } from './prescriptions-for-pickup.component';

describe('PrescriptionsForPickupComponent', () => {
  let component: PrescriptionsForPickupComponent;
  let fixture: ComponentFixture<PrescriptionsForPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionsForPickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionsForPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
