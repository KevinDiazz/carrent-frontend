import { Component, effect, input, output } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { OfficeResponse } from '../../../offices/models/office-response.model';
import { OfficeService } from '../../../offices/services/office.service';

@Component({
  selector: 'app-office-form',
  imports: [ReactiveFormsModule],
  templateUrl: './office-form.html',
})
export class OfficeForm {
  officeToEdit = input<OfficeResponse | null>(null);

  saved = output<void>();
  cancelled = output<void>();

  errorMessage = '';

  officeForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(private officeService: OfficeService) {
    effect(() => {
      const office = this.officeToEdit();

      this.errorMessage = '';

      if (office) {
        this.officeForm.patchValue({
          name: office.name,
          address: office.address,
          city: office.city,
          phone: office.phone,
        });
      } else {
        this.officeForm.reset();
      }
    });
  }

  get isEditing(): boolean {
    return this.officeToEdit() !== null;
  }

  onSubmit(): void {
    if (this.officeForm.invalid) {
      this.officeForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';

    const officeData = this.officeForm.getRawValue();
    const office = this.officeToEdit();

    if (office) {
      this.officeService.updateOffice(office.id, officeData).subscribe({
        next: () => this.saved.emit(),
        error: (error) => this.handleError(error),
      });
    } else {
      this.officeService.createOffice(officeData).subscribe({
        next: () => this.saved.emit(),
        error: (error) => this.handleError(error),
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  private handleError(error: any): void {
    console.error('Error al guardar la oficina:', error);

    this.errorMessage = error?.error?.message || 'Ha ocurrido un error al guardar la oficina.';
  }
}
