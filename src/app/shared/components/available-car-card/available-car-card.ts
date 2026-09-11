import { Component, Input } from '@angular/core';
import { CarAvailability } from '../../../features/cars/models/car-availability.model';

@Component({
  selector: 'app-available-car-card',
  imports: [],
  templateUrl: './available-car-card.html',
  styleUrl: './available-car-card.css',
})
export class AvailableCarCard {
  @Input({ required: true })
  car!: CarAvailability;

  getFuelTypeLabel(): string {
    const fuelTypes: Record<string, string> = {
      PETROL: 'Gasolina',
      HYBRID: 'Híbrido',
      ELECTRIC: 'Eléctrico',
    };

    return fuelTypes[this.car.fuelType] ?? this.car.fuelType;
  }

  getTransmissionLabel(): string {
    const transmissions: Record<string, string> = {
      MANUAL: 'Manual',
      AUTOMATIC: 'Automático',
    };

    return transmissions[this.car.transmission] ?? this.car.transmission;
  }
}
