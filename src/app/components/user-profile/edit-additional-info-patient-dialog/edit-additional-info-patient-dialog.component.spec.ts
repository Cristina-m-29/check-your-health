import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdditionalInfoPatientDialogComponent } from './edit-additional-info-patient-dialog.component';

describe('EditAdditionalInfoPatientDialogComponent', () => {
  let component: EditAdditionalInfoPatientDialogComponent;
  let fixture: ComponentFixture<EditAdditionalInfoPatientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdditionalInfoPatientDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdditionalInfoPatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
