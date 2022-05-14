import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientRegisterComponent } from './pacient-register.component';

describe('PacientRegisterComponent', () => {
  let component: PacientRegisterComponent;
  let fixture: ComponentFixture<PacientRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
