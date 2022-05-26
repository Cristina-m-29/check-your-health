import { Component, Input, OnInit } from '@angular/core';
import { Pharmacy } from 'src/app/models/pharmacy';

@Component({
  selector: 'cyh-pharmacy-details-card',
  templateUrl: './pharmacy-details-card.component.html',
  styleUrls: ['./pharmacy-details-card.component.sass']
})
export class PharmacyDetailsCardComponent implements OnInit {
  @Input() pharmacy = new Pharmacy();

  constructor() { }

  ngOnInit(): void {
  }

}
