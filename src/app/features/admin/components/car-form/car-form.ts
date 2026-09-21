import { Component, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarCreateRequest } from '../../../cars/models/car-create-request.model';
import { CarService } from '../../../cars/services/car.service';
import { CarStatus } from '../../../cars/models/car-status.model';
import { CarModelResponse } from '../../../card-models/models/car-model.model';
import { OfficeResponse } from '../../../offices/models/office-response.model';
import { CarResponse } from '../../../cars/models/car-response.model';
import { CarUpdateRequest } from '../../../cars/models/car-updated-request.model';
@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.html',
})
export class CarForm {
  private fb = inject(FormBuilder);
  private carService = inject(CarService);
  carModels = input<CarModelResponse[]>([]);
  offices = input<OfficeResponse[]>([]);
  carToEdit = input<CarResponse | null>(null);
  carCreated = output<void>();
  cancelled = output<void>();

  readonly carStatuses: CarStatus[] = ['AVAILABLE', 'UNAVAILABLE', 'MAINTENANCE'];

  carForm = this.fb.nonNullable.group({
    carModelId: [0, [Validators.required, Validators.min(1)]],
    officeId: [0, [Validators.required, Validators.min(1)]],
    year: [new Date().getFullYear(), Validators.required],
    licensePlate: ['', [Validators.required, Validators.pattern(/^[0-9]{4}[A-Z]{3}$/)]],
    fuelType: ['', Validators.required],
    transmission: ['', Validators.required],
    pricePerDay: [0, [Validators.required, Validators.min(0.01)]],
    status: ['AVAILABLE' as CarStatus, Validators.required],
  });

  constructor() {
    effect(() => {
      const car = this.carToEdit();

      if (car) {
        this.carForm.patchValue({
          carModelId: car.carModelId,
          officeId: car.officeId,
          year: car.year,
          licensePlate: car.licensePlate,
          fuelType: car.fuelType,
          transmission: car.transmission,
          pricePerDay: car.pricePerDay,
          status: car.status,
        });
      } else {
        this.carForm.reset({
          carModelId: 0,
          officeId: 0,
          year: new Date().getFullYear(),
          licensePlate: '',
          fuelType: '',
          transmission: '',
          pricePerDay: 0,
          status: 'AVAILABLE',
        });
      }
    });
  }
  onSubmit(): void {
    if (this.carForm.invalid) {
      this.carForm.markAllAsTouched();
      return;
    }

    const carData = this.carForm.getRawValue();
    const car = this.carToEdit();

    if (car) {
      const updateRequest: CarUpdateRequest = carData;

      this.carService.updateCar(car.id, updateRequest).subscribe({
        next: () => {
          this.carCreated.emit();
        },
        error: (error) => {
          this.handleError(error);
        },
      });
    } else {
      const createRequest: CarCreateRequest = carData;

      this.carService.createCar(createRequest).subscribe({
        next: () => {
          this.carCreated.emit();
        },
        error: (error) => {
          this.handleError(error);
        },
      });
    }
  }
  private handleError(error: any): void {
    console.error('Error al guardar el vehículo:', error);

    if (error.status === 409) {
      this.carForm.controls.licensePlate.setErrors({
        licensePlateTaken: true,
      });

      this.carForm.controls.licensePlate.markAsTouched();
    }
  }
}
