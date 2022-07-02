import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) { }

  public showToast(message: string): void {
    this._snackBar.open(message, 'ok', { duration: 2000 });
  }

}
