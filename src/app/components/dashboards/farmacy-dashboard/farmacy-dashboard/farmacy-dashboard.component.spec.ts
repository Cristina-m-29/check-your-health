import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmacyDashboardComponent } from './farmacy-dashboard.component';

describe('FarmacyDashboardComponent', () => {
  let component: FarmacyDashboardComponent;
  let fixture: ComponentFixture<FarmacyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmacyDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmacyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
