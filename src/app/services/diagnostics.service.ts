import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diagnostic } from '../models/diagnostic';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticsService {

  constructor(private base: BaseService) {}

  public addDiagnostic(appointmentId: string, diagnostic: Diagnostic): Observable<Diagnostic> {
    return this.base.post<Diagnostic, Diagnostic>('appointments/' + appointmentId + '/diagnostics', diagnostic);
  }
}
