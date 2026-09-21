import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideHouse } from '@lucide/angular';
@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive,LucideHouse],
  selector: 'app-admin-layout',
  styleUrl: './admin-layout.css',
  templateUrl: './admin-layout.html',
})
export class AdminLayout {}
