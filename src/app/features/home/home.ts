import { Component } from '@angular/core';
import { CarCard, CarCardData } from '../../shared/components/car-card/car-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CarCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}
  searchCars(officeId: string, startDate: string, endDate: string): void {
    if (!officeId || !startDate || !endDate) {
      return;
    }

    this.router.navigate(['/cars'], {
      queryParams: {
        officeId,
        startDate,
        endDate,
      },
    });
  }
  featuredCars: CarCardData[] = [
    {
      name: 'Toyota Yaris',
      image: '/images/toyota-yaris.png',
      category: 'Compacto',
      fuelTypes: ['Gasolina', 'Híbrido', 'Eléctrico'],
      transmissions: ['Manual', 'Automático'],
      seats: 5,
      pricePerDay: 35,
    },

    {
      name: 'SEAT Ibiza',
      image: '/images/seat-ibiza.png',
      category: 'Compacto',
      fuelTypes: ['Gasolina', 'Híbrido', 'Eléctrico'],
      transmissions: ['Manual', 'Automático'],
      seats: 5,
      pricePerDay: 32,
    },

    {
      name: 'Dacia Duster',
      image: '/images/dacia-duster.png',
      category: 'SUV',
      fuelTypes: ['Gasolina', 'Híbrido', 'Eléctrico'],
      transmissions: ['Manual', 'Automático'],
      seats: 5,
      pricePerDay: 45,
    },
  ];
}
