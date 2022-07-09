import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdditionalInfoMedicDialogComponent } from './edit-additional-info-medic-dialog.component';

describe('EditAdditionalInfoMedicDialogComponent', () => {
  let component: EditAdditionalInfoMedicDialogComponent;
  let fixture: ComponentFixture<EditAdditionalInfoMedicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdditionalInfoMedicDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdditionalInfoMedicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
