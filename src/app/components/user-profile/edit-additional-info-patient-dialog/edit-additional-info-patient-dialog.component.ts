import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Medic, Specialist } from 'src/app/models/medic';
import { UsersService } from 'src/app/services/users.service';

export interface DialogData {
  conditions: string[];
  medic: Specialist;
}

@Component({
  selector: 'cyh-edit-additional-info-patient-dialog',
  templateUrl: './edit-additional-info-patient-dialog.component.html',
  styleUrls: ['./edit-additional-info-patient-dialog.component.sass']
})
export class EditAdditionalInfoPatientDialogComponent implements OnInit {
  public editAdditionalInfoPatientForm = new FormGroup({
    condition: new FormControl(),
    medic: new FormControl()
  });

  public disabled = true;
  public medicsList: Medic[] = [];
  public medicsListForInput = new Observable<Medic[]>();

  public conditions: string[] = [];
  private medic = new Medic();

  @ViewChild(MatAutocompleteTrigger) trigger!: MatAutocompleteTrigger;

  constructor(
    public dialogRef: MatDialogRef<EditAdditionalInfoPatientDialogComponent>, 
    private usersService: UsersService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.editAdditionalInfoPatientForm.controls['medic'].valueChanges.subscribe((value: string) => {
      this.medicsListForInput = of(this._filter(value));
    });
  }

  public ngOnInit(): void {
    this.conditions = this.data.conditions;
    this.medic = this.data.medic;
    this.editAdditionalInfoPatientForm.controls['medic'].setValue(this.medic.name);

    this.getAllMedics();
    this.cd.detectChanges();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onFocus(): void {
    this.trigger._onChange(""); 
    this.trigger.openPanel();
    this.cd.detectChanges();
  }

  public removeCondition(condition: string): void {
    this.conditions = this.conditions.filter((c: string) => c !== condition);
    this.disabled = false;
    this.cd.detectChanges();
  }

  public addCondition(): void {
    this.conditions.push(this.editAdditionalInfoPatientForm.value.condition);
    this.disabled = false;
    this.cd.detectChanges();
  }

  public selectMedic(medic: Medic): void {
    this.medic = medic;
    this.disabled = false;
    this.cd.detectChanges();
  }

  public editAdditionalInfoPatient(): void {
    if (this.medic.id !== this.data.medic.id) {
      this.usersService.editAdditionalInfoPatient(this.conditions, this.medic.id);
    }
    else {
      this.usersService.editAdditionalInfoPatient(this.conditions);
    }
    this.onNoClick();
  }

  private getAllMedics(): void {
    this.usersService.getMedicsListForRegister().subscribe((mediscs: Medic[]) => {
      this.medicsList = mediscs;
    });
  }

  private _filter(value: string): Medic[] {
    return this.medicsList.filter(option => option.name.startsWith(value));
  }

}
