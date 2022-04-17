import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cyh-pacient-register',
  templateUrl: './pacient-register.component.html',
  styleUrls: ['./pacient-register.component.sass']
})
export class PacientRegisterComponent implements OnInit {
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
