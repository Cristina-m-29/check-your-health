import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicAddRecommendationComponent } from './medic-add-recommendation.component';

describe('MedicAddRecommendationComponent', () => {
  let component: MedicAddRecommendationComponent;
  let fixture: ComponentFixture<MedicAddRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicAddRecommendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicAddRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
