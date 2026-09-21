import {
  Component,
  OnInit,
  computed,
  signal,
} from '@angular/core';

import { OfficeService } from '../../../offices/services/office.service';
import { OfficeResponse } from '../../../offices/models/office-response.model';
import { OfficeForm } from '../../components/office-form/office-form';

@Component({
  selector: 'app-offices',
  imports: [OfficeForm],
  styleUrl: './offices.css',
  templateUrl: './offices.html',
})
export class Offices implements OnInit {
  offices = signal<OfficeResponse[]>([]);

  showForm = signal(false);

  officeToEdit = signal<OfficeResponse | null>(null);

  searchTerm = signal('');

  filteredOffices = computed(() => {
    const search = this.searchTerm().trim().toUpperCase();

    return this.offices().filter(
      (office) =>
        office.name.toUpperCase().includes(search) ||
        office.address.toUpperCase().includes(search) ||
        office.city.toUpperCase().includes(search) ||
        office.phone.includes(search),
    );
  });

  constructor(private officeService: OfficeService) {}

  ngOnInit(): void {
    this.loadOffices();
  }

  loadOffices(): void {
    this.officeService.getOffices().subscribe({
      next: (offices) => this.offices.set(offices),
      error: (error) =>
        console.error('Error al obtener las oficinas:', error),
    });
  }

  openForm(): void {
    this.officeToEdit.set(null);
    this.showForm.set(true);
  }

  editOffice(office: OfficeResponse): void {
    this.officeToEdit.set(office);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.officeToEdit.set(null);
  }

  onSaved(): void {
    this.closeForm();
    this.loadOffices();
  }
}