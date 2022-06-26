import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPrescriptionsHistoryComponent } from './pharmacy-prescriptions-history.component';

describe('PharmacyPrescriptionsHistoryComponent', () => {
  let component: PharmacyPrescriptionsHistoryComponent;
  let fixture: ComponentFixture<PharmacyPrescriptionsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyPrescriptionsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyPrescriptionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
