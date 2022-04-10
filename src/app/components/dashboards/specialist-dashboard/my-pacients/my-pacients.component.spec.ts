import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPacientsComponent } from './my-pacients.component';

describe('MyPacientsComponent', () => {
  let component: MyPacientsComponent;
  let fixture: ComponentFixture<MyPacientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPacientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPacientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
