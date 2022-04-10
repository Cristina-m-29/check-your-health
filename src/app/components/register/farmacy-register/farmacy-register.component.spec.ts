import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmacyRegisterComponent } from './farmacy-register.component';

describe('FarmacyRegisterComponent', () => {
  let component: FarmacyRegisterComponent;
  let fixture: ComponentFixture<FarmacyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmacyRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmacyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
