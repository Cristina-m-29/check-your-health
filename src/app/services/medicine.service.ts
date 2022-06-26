import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Medicine } from '../models/medicine';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  public websocketIgnoreNextEvent: Boolean = false;

  constructor(private base: BaseService, private websocketService: WebsocketService) { }

  public getMedicineEvents(): Observable<any> {
    return new Observable<any>(subscriber => {
      this.websocketService.connect('medicine').subscribe((value) => {
        console.log("Service:", value);
        if (!this.websocketIgnoreNextEvent) {
          subscriber.next(value);
        } else {
          this.websocketIgnoreNextEvent = false;
        }
      })
    })
  }

  public getAllMedicine(): Observable<Medicine[]> {
    return this.base.get<Medicine[]>("medicine");
  }

  public addMedicine(medicine: Medicine): Observable<Medicine> {
    return this.base.post<Medicine, Medicine>("medicine", medicine);
  }
}
