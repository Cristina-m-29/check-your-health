import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicRegisterComponent } from './medic-register.component';

describe('MedicRegisterComponent', () => {
  let component: MedicRegisterComponent;
  let fixture: ComponentFixture<MedicRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
