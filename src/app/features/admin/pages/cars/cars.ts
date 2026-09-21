import { Component, OnInit, signal, computed } from '@angular/core';

import { CarService } from '../../../cars/services/car.service';
import { CarResponse } from '../../../cars/models/car-response.model';
import { CarForm } from '../../components/car-form/car-form';
import { OfficeService } from '../../../offices/services/office.service';
import { CarModelService } from '../../../card-models/services/car-model.service';
import { OfficeResponse } from '../../../offices/models/office-response.model';
import { CarModelResponse } from '../../../card-models/models/car-model.model';
@Component({
  imports: [CarForm],
  selector: 'app-cars',
  styleUrl: './cars.css',
  templateUrl: './cars.html',
})
export class Cars implements OnInit {
  cars = signal<CarResponse[]>([]);
  showForm = signal(false);
  carModels = signal<CarModelResponse[]>([]);
  offices = signal<OfficeResponse[]>([]);
  searchLicensePlate = signal('');
  carToEdit = signal<CarResponse | null>(null);
  showDeleteModal = signal(false);
  filteredCars = computed(() => {
    const search = this.searchLicensePlate().trim().toUpperCase();

    return this.cars().filter((car) => car.licensePlate.toUpperCase().includes(search));
  });

  constructor(
    private carService: CarService,
    private officeService: OfficeService,
    private carModelService: CarModelService,
  ) {}

  ngOnInit(): void {
    this.loadCars();
    this.loadOffices();
    this.loadCarModels();
  }

  loadCars(): void {
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars.set(cars);
      },
      error: (error) => {
        console.error('Error al obtener los vehículos:', error);
      },
    });
  }
  loadOffices(): void {
    this.officeService.getOffices().subscribe({
      next: (offices) => {
        this.offices.set(offices);
      },
      error: (error) => {
        console.error('Error al obtener las oficinas:', error);
      },
    });
  }

  loadCarModels(): void {
    this.carModelService.getCarModels().subscribe({
      next: (carModels) => {
        this.carModels.set(carModels);
      },
      error: (error) => {
        console.error('Error al obtener los modelos:', error);
      },
    });
  }

  openForm(): void {
    this.carToEdit.set(null);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.carToEdit.set(null);
  }

  onCarCreated(): void {
    this.showForm.set(false);
    this.loadCars();
  }
  editCar(car: CarResponse): void {
    this.carToEdit.set(car);
    this.showForm.set(true);
  }

}
