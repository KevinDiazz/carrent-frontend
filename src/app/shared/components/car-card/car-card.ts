import { Component, Input } from '@angular/core';

export interface CarCardData {
  name: string;
  image: string;
  category: string;
  fuelTypes: string[];
  transmissions: string[];
  seats: number;
  pricePerDay: number;
}

@Component({
  selector: 'app-car-card',
  imports: [],
  templateUrl: './car-card.html',
  styleUrl: './car-card.css'
})
export class CarCard {

  @Input({ required: true })
  car!: CarCardData;

}