import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicHomeComponent } from './medic-home.component';

describe('MedicHomeComponent', () => {
  let component: MedicHomeComponent;
  let fixture: ComponentFixture<MedicHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
