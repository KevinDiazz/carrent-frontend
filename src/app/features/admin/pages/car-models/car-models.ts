import { Component, OnInit, signal, computed } from '@angular/core';

import { CarModelService } from '../../../card-models/services/car-model.service';
import { CarModelResponse } from '../../../card-models/models/car-model.model';
import { CarModelForm } from '../../components/car-model-form/car-model-form';

@Component({
  imports: [CarModelForm],
  selector: 'app-car-models',
  styleUrl: './car-models.css',
  templateUrl: './car-models.html',
})
export class CarModels implements OnInit {
  carModels = signal<CarModelResponse[]>([]);
  showForm = signal(false);
  carModelToEdit = signal<CarModelResponse | null>(null);
  searchTerm = signal('');

  filteredCarModels = computed(() => {
    const search = this.searchTerm().trim().toUpperCase();

    return this.carModels().filter(
      (carModel) =>
        carModel.brand.toUpperCase().includes(search) ||
        carModel.model.toUpperCase().includes(search),
    );
  });

  constructor(private carModelService: CarModelService) {}

  ngOnInit(): void {
    this.loadCarModels();
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
    this.carModelToEdit.set(null);
    this.showForm.set(true);
  }

  editCarModel(carModel: CarModelResponse): void {
    this.carModelToEdit.set(carModel);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.carModelToEdit.set(null);
  }

  onSaved(): void {
    this.closeForm();
    this.loadCarModels();
  }
}
