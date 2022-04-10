import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientDashboardComponent } from './pacient-dashboard.component';

describe('PacientDashboardComponent', () => {
  let component: PacientDashboardComponent;
  let fixture: ComponentFixture<PacientDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
