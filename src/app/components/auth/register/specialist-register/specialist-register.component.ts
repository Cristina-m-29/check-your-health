import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cyh-specialist-register',
  templateUrl: './specialist-register.component.html',
})
export class SpecialistRegisterComponent {
  @Output() public goBackToBaseRegister = new EventEmitter();
  @Output() public register = new EventEmitter();

  public medicRegisterForm = new FormGroup({
    code: new FormControl(),
    domain: new FormControl(),
    location: new FormControl()
  });

  public goBack(): void {
    this.goBackToBaseRegister.emit();
  }

  public finishRegister(): void {
    this.register.emit(this.medicRegisterForm);
  }
}
