import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdditionalInfoPharmacyDialogComponent } from './edit-additional-info-pharmacy-dialog.component';

describe('EditAdditionalInfoPharmacyDialogComponent', () => {
  let component: EditAdditionalInfoPharmacyDialogComponent;
  let fixture: ComponentFixture<EditAdditionalInfoPharmacyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdditionalInfoPharmacyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdditionalInfoPharmacyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
