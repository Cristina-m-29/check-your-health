import { FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Diagnostic } from 'src/app/models/diagnostic';

export interface DialogData {
  editable: boolean;
  diagnostic: undefined | Diagnostic;
}

@Component({
  selector: 'cyh-medic-add-diagnostic-dialog',
  templateUrl: './medic-add-diagnostic-dialog.component.html',
  styleUrls: ['./medic-add-diagnostic-dialog.component.sass']
})
export class MedicAddDiagnosticDialogComponent implements OnInit {
  public editable = true;
  public diagnostic = new Diagnostic();
  public diagnosticForm = new FormGroup({
    final: new FormControl(false),
    symptoms: new FormControl(),
    recommendations: new FormControl(),
    clinicalExam: new FormControl(),
    registryNumber: new FormControl(), 
    servicesUsed: new FormControl(),
    diagnosticPlain: new FormControl(),
    diagnosticEncoded: new FormControl(),
    paraclinicalExaminationResults: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<MedicAddDiagnosticDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.diagnosticForm.valueChanges.subscribe((diagnostic: Diagnostic) => {
      this.diagnostic = diagnostic;
    });
  }

  public ngOnInit(): void {
    console.log(this.data);
    if (!this.data.editable) {
      this.editable = false;
      this.diagnosticForm.controls['final'].setValue(this.data.diagnostic?.final);
      this.diagnosticForm.controls['final'].disable();

      this.diagnosticForm.controls['symptoms'].setValue(this.data.diagnostic?.symptoms);
      this.diagnosticForm.controls['symptoms'].disable();

      this.diagnosticForm.controls['recommendations'].setValue(this.data.diagnostic?.recommendations);
      this.diagnosticForm.controls['recommendations'].disable();

      this.diagnosticForm.controls['clinicalExam'].setValue(this.data.diagnostic?.clinicalExam);
      this.diagnosticForm.controls['clinicalExam'].disable();

      this.diagnosticForm.controls['registryNumber'].setValue(this.data.diagnostic?.registryNumber);
      this.diagnosticForm.controls['registryNumber'].disable();

      this.diagnosticForm.controls['servicesUsed'].setValue(this.data.diagnostic?.servicesUsed);
      this.diagnosticForm.controls['servicesUsed'].disable();

      this.diagnosticForm.controls['diagnosticPlain'].setValue(this.data.diagnostic?.diagnosticPlain);
      this.diagnosticForm.controls['diagnosticPlain'].disable();

      this.diagnosticForm.controls['diagnosticEncoded'].setValue(this.data.diagnostic?.diagnosticEncoded);
      this.diagnosticForm.controls['diagnosticEncoded'].disable();

      this.diagnosticForm.controls['paraclinicalExaminationResults'].setValue(this.data.diagnostic?.paraclinicalExaminationResults);
      this.diagnosticForm.controls['paraclinicalExaminationResults'].disable();
    }
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
