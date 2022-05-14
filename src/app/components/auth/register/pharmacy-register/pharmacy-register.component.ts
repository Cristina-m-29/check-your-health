import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cyh-pharmacy-register',
  templateUrl: './pharmacy-register.component.html',
  styleUrls: ['./pharmacy-register.component.sass']
})
export class PharmacyRegisterComponent {
  @Output() public goBackToBaseRegister = new EventEmitter();
  @Output() public register = new EventEmitter();

  public farmacyRegisterForm = new FormGroup({
    location: new FormControl()
  });

  public goBack(): void {
    this.goBackToBaseRegister.emit();
  }

  public finishRegister(): void {
    this.register.emit(this.farmacyRegisterForm);
  }
}
