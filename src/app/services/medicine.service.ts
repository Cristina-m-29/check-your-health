import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Medicine } from '../models/medicine';
import { WebsocketService } from './websocket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  public websocketIgnoreNextEvent: Boolean = false;

  constructor(private base: BaseService, private websocketService: WebsocketService, private toastService: ToastService) { }

  public getMedicineEvents(): Observable<any> {
    return new Observable<any>(subscriber => {
      this.websocketService.connect('medicine').subscribe((value) => {
        if (!this.websocketIgnoreNextEvent) {
          subscriber.next(value);
        } else {
          this.websocketIgnoreNextEvent = false;
        }
      })
    })
  }

  public getAllMedicine(): Observable<Medicine[]> {
    return this.base.get<Medicine[]>("medicine")
      .pipe(catchError((error: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Nu s-a putut obține lista cu medicamente!')
        return [];
      }));
  }

  public addMedicine(medicine: Medicine): Observable<Medicine> {
    return this.base
      .post<Medicine, Medicine>("medicine", medicine)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare!')
        return EMPTY;
      }))
  }
}
