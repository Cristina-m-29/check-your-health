import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLoginTypeComponent } from './choose-login-type.component';

describe('ChooseLoginTypeComponent', () => {
  let component: ChooseLoginTypeComponent;
  let fixture: ComponentFixture<ChooseLoginTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseLoginTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLoginTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
