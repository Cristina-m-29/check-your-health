import { Component, Input } from '@angular/core';

@Component({
  selector: 'cyh-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.sass']
})
export class GoogleMapComponent {
  @Input() address: string = "Strada Palat nr 1, Iasi, Iasi, RO";
}
