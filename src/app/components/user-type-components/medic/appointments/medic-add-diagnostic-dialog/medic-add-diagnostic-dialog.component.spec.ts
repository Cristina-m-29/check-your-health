import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicAddDiagnosticDialogComponent } from './medic-add-diagnostic-dialog.component';

describe('MedicAddDiagnosticDialogComponent', () => {
  let component: MedicAddDiagnosticDialogComponent;
  let fixture: ComponentFixture<MedicAddDiagnosticDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicAddDiagnosticDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicAddDiagnosticDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
