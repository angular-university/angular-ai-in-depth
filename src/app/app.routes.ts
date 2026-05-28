import { Routes } from '@angular/router';
import { authGuard } from './shared/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./auth/sign-in/sign-in').then(mod => mod.SignIn),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./auth/sign-up/sign-up').then(mod => mod.SignUp),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(mod => mod.Home),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: '/sign-in' },
];
