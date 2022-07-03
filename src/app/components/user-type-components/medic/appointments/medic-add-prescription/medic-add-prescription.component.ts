import { PrescribedMedicine } from './../../../../../models/medicine';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Prescription } from 'src/app/models/prescription';
import { UsersService } from 'src/app/services/users.service';
import { Medicine } from 'src/app/models/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { Pharmacy } from 'src/app/models/pharmacy';
import { SocketNotification } from 'src/app/models/notification';

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

  public medicineListInputs = new FormGroup({});

  private pharmaciesList: Pharmacy[] = [];
  private medicineList: Medicine[] = [];
  private medicineToAdd = "";

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
      if (value !== "Creaza acest medicament") {
        if (value !== 'Inchide') {
          this.medicineToAdd = value;
        }
      }
      else {
        this.createMedicine(this.medicineToAdd);
        this.medicineToAdd = "";
      }
      this.medicineListForInput = of(
        [{id: 'inchide', name: 'Inchide'}].concat(
          this._filterMedine(value).concat(
            value !== '' ? [{id: 'create', name: 'Creaza acest medicament'}] : []
          )
        )
      );
    });

    this.medicineListInputs.valueChanges.subscribe((value: any) => {
      const keys = Object.keys(value);
      keys.forEach((key: string) => {
        this.prescription.medicines[keys.indexOf(key)].quantity = value[key];
      });
    });
  }

  public ngOnInit(): void {
    this.getAllMedicine();
    this.getAllMedicineEvents();
    this.getAllPharmacies();
    this.getAllPharmacyEvents();
  }

  public selectPharmacy(pharmacy: Pharmacy): void {
    this.prescription.pharmacy = pharmacy.id;
  }

  public createMedicine(name: string): void {
    this.medicineService.addMedicine({id: '', name: name}).subscribe((m: Medicine) => {
      this.medicineList.push(m);
      this.medicineInput.setValue("");
    });
  }

  public removeMedicine(medicine: PrescribedMedicine): void {
    this.prescription.medicines = this.prescription.medicines
      .filter((m: PrescribedMedicine) => m.medicine.id !== medicine.medicine.id);
  }

  public selectMedicine(medicine: Medicine): void {
    if (medicine.id !== 'create' && medicine.id !== 'inchide') {
      this.prescription.medicines.push({
        medicine: medicine,
        quantity: 0
      });
      this.medicineListInputs.addControl(medicine.name, new FormControl(0));
      this.medicineInput.setValue("");
    }
    else {
      this.medicineInput.setValue("");
    }
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

  public isCreateBtnDisabled(): boolean {
    return !this.prescription.pharmacy || this.prescription.medicines.length === 0 || 
      this.prescription.medicines.some((m: PrescribedMedicine) => m.quantity === 0 || (m.quantity.toString() || "") === "");
  }

  private getAllPharmacies(): void {
    this.usersService.getAllPharmacies().subscribe((pharmacies: Pharmacy[]) => {
      this.pharmaciesList = pharmacies;
    });
  }

  private getAllPharmacyEvents(): void {
    this.usersService.getPharmacyEvents().subscribe((value) => {
      const notif = <SocketNotification>JSON.parse(value.data);
      if(notif.eventMethod === 'POST') {
        this.getAllPharmacies();
      }
    });
  }

  private getAllMedicine(): void {
    this.medicineService.getAllMedicine().subscribe((medicines: Medicine[]) => {
      this.medicineList = medicines;
    });
  }

  private getAllMedicineEvents(): void {
    this.medicineService.getMedicineEvents().subscribe((value) => {
      const notif = <SocketNotification>JSON.parse(value.data);
      if(notif.eventMethod === 'POST') {
        this.getAllMedicine();
      }
    });
  }

  private _filterPharmaicies(value: string): Pharmacy[] {
    return this.pharmaciesList.filter(option => option.name.startsWith(value));
  }

  private _filterMedine(value: string): Medicine[] {
    return this.medicineList.filter(option => option.name.startsWith(value));
  }

}
