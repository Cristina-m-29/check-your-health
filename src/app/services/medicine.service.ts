import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private base: BaseService) { }

  public getAllMedicine(): Observable<Medicine[]> {
    return this.base.get<Medicine[]>("medicine");
  }

  public addMedicine(medicine: Medicine): Observable<Medicine> {
    return this.base.post<Medicine, Medicine>("medicine", medicine);
  }
}
