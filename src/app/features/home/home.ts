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
  searchError: string = '';

  constructor(private router: Router) {}

  searchCars(officeId: string, startDate: string, endDate: string): void {
    this.searchError = '';
    if (!officeId || !startDate || !endDate) {
      this.searchError = 'Selecciona una oficina y completa las fechas.*';
      return;
    }
    const today = new Date().toISOString().split('T')[0];

    if (startDate < today) {
      this.searchError = 'La fecha de recogida no puede ser anterior a hoy.*';
      return;
    }

    if (endDate <= startDate) {
      this.searchError = 'La fecha de devolución debe ser posterior a la fecha de recogida.*';
      return;
    }

    this.router.navigate(['/cars'], {
      queryParams: {
        officeId,
        startDate,
        endDate,
        pickupTime: '09:00',
        returnTime: '21:00',
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
