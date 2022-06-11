import { FormControl } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Prescription } from 'src/app/models/prescription';
import { UsersService } from 'src/app/services/users.service';
import { Medicine } from 'src/app/models/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { Pharmacy } from 'src/app/models/pharmacy';

@Component({
  selector: 'cyh-medic-add-prescription',
  templateUrl: './medic-add-prescription.component.html',
  styleUrls: ['./medic-add-prescription.component.sass']
})
export class MedicAddPrescriptionComponent implements OnInit {
  public prescription = new Prescription();

  public pharmacyInput = new FormControl();
  public pharmaciesListForInput = new Observable<Pharmacy[]>();

  public medicineInput = new FormControl();
  public medicineListForInput = new Observable<Medicine[]>();

  private pharmaciesList: Pharmacy[] = [];
  private medicineList: Medicine[] = [];

  @ViewChild('specialistTrigger', { read: MatAutocompleteTrigger }) specialistTrigger!: MatAutocompleteTrigger;
  @ViewChild('medicineTrigger', { read: MatAutocompleteTrigger }) medicineTrigger!: MatAutocompleteTrigger;

  constructor(
    public dialogRef: MatDialogRef<MedicAddPrescriptionComponent>,
    private cd: ChangeDetectorRef,
    private usersService: UsersService,
    private medicineService: MedicineService,
  ) {
    this.pharmacyInput.valueChanges.subscribe((value: string) => {
      this.pharmaciesListForInput = of(this._filterPharmaicies(value));
    });
    this.medicineInput.valueChanges.subscribe((value: string) => {
      this.medicineListForInput = of(
        this._filterMedine(value).concat(value !== '' ? [{id: 'create', name: 'Creaza acest medicament'}] : [])
      );
    });
  }

  public ngOnInit(): void {
    this.getAllMedicine();
    this.getAllPharmacies();
  }

  public selectPharmacy(pharmacy: Pharmacy): void {
    this.prescription.pharmacy = pharmacy.id;
  }

  public selectMedicine(medicine: Medicine): void {
    // to do
  }

  public onFocusSpecialist(): void {
    this.specialistTrigger._onChange(""); 
    this.specialistTrigger.openPanel();
    this.cd.detectChanges();
  }

  public onFocusMedicine(): void {
    this.medicineTrigger._onChange(""); 
    this.medicineTrigger.openPanel();
    this.cd.detectChanges();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  private getAllPharmacies(): void {
    this.usersService.getAllPharmacies().subscribe((pharmacies: Pharmacy[]) => {
      this.pharmaciesList = pharmacies;
    });
  }

  private getAllMedicine(): void {
    this.medicineService.getAllMedicine().subscribe((medicines: Medicine[]) => {
      this.medicineList = medicines;
    }); 
  }

  private _filterPharmaicies(value: string): Pharmacy[] {
    return this.pharmaciesList.filter(option => option.name.startsWith(value));
  }

  private _filterMedine(value: string): Medicine[] {
    return this.medicineList.filter(option => option.name.startsWith(value));
  }

}
