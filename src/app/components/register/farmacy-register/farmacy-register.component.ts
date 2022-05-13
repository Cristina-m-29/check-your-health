import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cyh-farmacy-register',
  templateUrl: './farmacy-register.component.html',
  styleUrls: ['./farmacy-register.component.sass']
})
export class FarmacyRegisterComponent {
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
