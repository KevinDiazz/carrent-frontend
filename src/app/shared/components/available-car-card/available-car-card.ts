import { Component, Input } from '@angular/core';
import { CarAvailability } from '../../../features/cars/models/car-availability.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-available-car-card',
  imports: [],
  templateUrl: './available-car-card.html',
  styleUrl: './available-car-card.css',
})
export class AvailableCarCard {
  @Input({ required: true })
  car!: CarAvailability;
  @Input({ required: true })
  officeId!: string;

  @Input({ required: true })
  startDate!: string;

  @Input({ required: true })
  endDate!: string;

  @Input({ required: true })
  pickupTime!: string;

  @Input({ required: true })
  returnTime!: string;

  constructor(private router: Router) {}

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

  reserve(): void {
    this.router.navigate(['/booking/confirm'], {
      state: {
        booking: {
          car: this.car,
          officeId: this.officeId,
          startDate: this.startDate,
          endDate: this.endDate,
          pickupTime: this.pickupTime,
          returnTime: this.returnTime,
        },
      },
    });
  }
}
