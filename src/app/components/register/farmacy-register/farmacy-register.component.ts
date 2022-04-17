import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-farmacy-register',
  templateUrl: './farmacy-register.component.html',
  styleUrls: ['./farmacy-register.component.sass']
})
export class FarmacyRegisterComponent implements OnInit {
  @Output() public goBackToBaseRegister = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public goBack(): void {
    this.goBackToBaseRegister.emit();
  }

  public register(): void {
    // to do
    this.authService.navigateToDashboard();
  }

}
