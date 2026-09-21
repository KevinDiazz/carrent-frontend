import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.services';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  constructor(public adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.loadTotalCars();
    this.adminService.loadTotalCarModels();
    this.adminService.loadTotalReservations();
    this.adminService.loadTotalOffices();
  }
}
