import { Component, signal, OnInit, computed, effect } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AvailableCarCard } from '../../../../shared/components/available-car-card/available-car-card';
import { CarAvailability } from '../../models/car-availability.model';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, AvailableCarCard],
  selector: 'app-car-list',
  styleUrl: './car-list.css',
  templateUrl: './car-list.html',
})
export class CarList implements OnInit {
  cars = signal<CarAvailability[]>([]);
  fuelFilter = signal<string>('');
  transmissionFilter = signal<string>('');
  sortPrice = signal<string>('');
  pickupTime!: string;
  returnTime!: string;
  searchForm = new FormGroup({
    officeId: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });
  filtersOpen = signal(false);
  searchError: string = '';
  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const officeId = params['officeId'];
      const startDate = params['startDate'];
      const endDate = params['endDate'];
      this.pickupTime = params['pickupTime'];
      this.returnTime = params['returnTime'];
      if (!officeId || !startDate || !endDate) {
        return;
      }
      this.searchForm.patchValue({
        officeId,
        startDate,
        endDate,
      });

      this.searchCars();
    });
  }

  filteredCars = computed(() => {
    let result = this.cars();

    if (this.fuelFilter()) {
      result = result.filter((car) => car.fuelType === this.fuelFilter());
    }

    if (this.transmissionFilter()) {
      result = result.filter((car) => car.transmission === this.transmissionFilter());
    }

    if (this.sortPrice() === 'asc') {
      result = [...result].sort((a, b) => a.pricePerDay - b.pricePerDay);
    }

    if (this.sortPrice() === 'desc') {
      result = [...result].sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return result;
  });

  searchCars(): void {
    this.searchError = '';

    const officeId = this.searchForm.value.officeId;
    const startDate = this.searchForm.value.startDate;
    const endDate = this.searchForm.value.endDate;

    if (!officeId || !startDate || !endDate) {
      this.searchForm.markAllAsTouched();
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
    const officeIdNumber = Number(officeId);

    this.pickupTime = '09:00';
    this.returnTime = '21:00';

    this.carService.getAvailableCars(startDate, endDate, officeIdNumber).subscribe({
      next: (cars) => {
        this.cars.set(cars);
      },
      error: (error) => {
        console.error('ERROR:', error);
      },
    });
  }
}
