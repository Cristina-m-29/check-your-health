import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cyh-pacient-register',
  templateUrl: './pacient-register.component.html',
})
export class PacientRegisterComponent {
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
