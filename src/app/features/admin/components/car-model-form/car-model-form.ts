import { Component, effect, inject, input, output } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CarModelResponse } from '../../../card-models/models/car-model.model';
import { CarModelCreateRequest } from '../../../card-models/models/card-model-request.model';
import { CarModelUpdateRequest } from '../../../card-models/models/car-model-update-request.model';
import { CarModelService } from '../../../card-models/services/car-model.service';

@Component({
  selector: 'app-car-model-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './car-model-form.html',
})
export class CarModelForm {
  private fb = inject(FormBuilder);
  private carModelService = inject(CarModelService);

  carModelToEdit = input<CarModelResponse | null>(null);

  saved = output<void>();
  cancelled = output<void>();

  carModelForm = this.fb.nonNullable.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const carModel = this.carModelToEdit();

      if (carModel) {
        this.carModelForm.patchValue({
          brand: carModel.brand,
          model: carModel.model,
        });
      } else {
        this.carModelForm.reset({
          brand: '',
          model: '',
        });
      }
    });
  }

  onSubmit(): void {
    if (this.carModelForm.invalid) {
      this.carModelForm.markAllAsTouched();
      return;
    }

    const formData = this.carModelForm.getRawValue();
    const carModel = this.carModelToEdit();

    if (carModel) {
      const updateRequest: CarModelUpdateRequest = formData;

      this.carModelService.updateCarModel(carModel.id, updateRequest).subscribe({
        next: () => this.saved.emit(),
        error: (error) => this.handleError(error),
      });
    } else {
      const createRequest: CarModelCreateRequest = formData;

      this.carModelService.createCarModel(createRequest).subscribe({
        next: () => this.saved.emit(),
        error: (error) => this.handleError(error),
      });
    }
  }

  private handleError(error: unknown): void {
    console.error('Error al guardar el modelo:', error);
  }
}
