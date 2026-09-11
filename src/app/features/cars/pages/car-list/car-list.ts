import { Component, signal, OnInit } from '@angular/core';
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
  searchForm = new FormGroup({
    officeId: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const officeId = params['officeId'];
      const startDate = params['startDate'];
      const endDate = params['endDate'];

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

  searchCars(): void {

    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const officeId = Number(this.searchForm.value.officeId);
    const startDate = this.searchForm.value.startDate!;
    const endDate = this.searchForm.value.endDate!;

    this.carService.getAvailableCars(startDate, endDate, officeId).subscribe({
      next: (cars) => {
        this.cars.set(cars);
      },
      error: (error) => {
        console.error('ERROR:', error);
      },
    });
  }
}
