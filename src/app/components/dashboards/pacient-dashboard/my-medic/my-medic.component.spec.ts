import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMedicComponent } from './my-medic.component';

describe('MyMedicComponent', () => {
  let component: MyMedicComponent;
  let fixture: ComponentFixture<MyMedicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMedicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
