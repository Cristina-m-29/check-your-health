import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Diagnostic } from '../models/diagnostic';
import { BaseService } from './base.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticsService {

  constructor(private base: BaseService, private toastService: ToastService) {}

  public addDiagnostic(appointmentId: string, diagnostic: Diagnostic): Observable<Diagnostic> {
    return this.base
      .post<Diagnostic, Diagnostic>('appointments/' + appointmentId + '/diagnostics', diagnostic)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.toastService.showToast('A apărut o eroare! Diagnosticul nu a putut fi adăugat!')
        return EMPTY;
      }))
      .pipe(map((diagnostic: Diagnostic) => {
        this.toastService.showToast(' Diagnosticul a fost adăugat cu succes!')
        return diagnostic;
      }));
  }
}
