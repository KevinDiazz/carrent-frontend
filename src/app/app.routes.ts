import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { PublicLayout } from './layout/public-layout/public-layout';
import { Home } from './features/home/home';
import { CarList } from './features/cars/pages/car-list/car-list';
import { BookingConfirm } from './features/bookings/pages/booking-confirm/booking-confirm';
import { BookingSuccess } from './features/bookings/pages/booking-success/booking-success';
import { MyReservations } from './features/bookings/pages/my-reservations/my-reservations';
import { authGuard } from './core/guards/auth.guard';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { adminGuard } from './core/guards/admin-guard.guard';
export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'cars',
        component: CarList,
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'booking/confirm',
        component: BookingConfirm,
      },
      { path: 'booking/success', component: BookingSuccess },
      {
        path: 'reservations',
        component: MyReservations,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'cars',
        loadComponent: () => import('./features/admin/pages/cars/cars').then((m) => m.Cars),
      },
      {
        path: 'car-models',
        loadComponent: () =>
          import('./features/admin/pages/car-models/car-models').then((m) => m.CarModels),
      },
      {
        path: 'offices',
        loadComponent: () =>
          import('./features/admin/pages/offices/offices').then((m) => m.Offices),
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import('./features/admin/pages/reservations/reservations').then((m) => m.Reservations),
      },
    ],
  },
];
