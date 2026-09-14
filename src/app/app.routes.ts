import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { PublicLayout } from './layout/public-layout/public-layout';
import { Home } from './features/home/home';
import { CarList } from './features/cars/pages/car-list/car-list';
import { BookingConfirm } from './features/bookings/pages/booking-confirm/booking-confirm';
import { BookingSuccess } from './features/bookings/pages/booking-success/booking-success';
import { MyReservations } from './features/bookings/pages/my-reservations/my-reservations';
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
      },
    ],
  },
];
