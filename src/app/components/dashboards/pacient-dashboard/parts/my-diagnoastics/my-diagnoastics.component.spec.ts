import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDiagnoasticsComponent } from './my-diagnoastics.component';

describe('MyDiagnoasticsComponent', () => {
  let component: MyDiagnoasticsComponent;
  let fixture: ComponentFixture<MyDiagnoasticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDiagnoasticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDiagnoasticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
