import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recommendation } from '../models/recommendation';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RecommandationsService {

  constructor(private baseService: BaseService) { }

  public getRecommandations(): Observable<Recommendation[]> {
    return this.baseService.get<Recommendation[]>('users/recommendations');
  }

}
