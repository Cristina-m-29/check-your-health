import { Injectable } from '@angular/core';
import { Diagnostic } from '../models/diagnostic';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticsService {

  constructor(private base: BaseService) {}

  public addDiagnostic(appointmentId: string, diagnostic: Diagnostic): any {
    // to do
  }
}
