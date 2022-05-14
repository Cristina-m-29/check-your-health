import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cyh-patient-register',
  templateUrl: './patient-register.component.html',
})
export class PatientRegisterComponent {
  @Output() public goBackToBaseRegister = new EventEmitter();
  @Output() public register = new EventEmitter();

  public medicName = new FormGroup({
    name: new FormControl()
  });

  public goBack(): void {
    this.goBackToBaseRegister.emit();
  }

  public finishRegister(): void {
    this.register.emit(this.medicName);
  }

}
