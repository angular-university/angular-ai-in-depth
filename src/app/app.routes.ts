import { Routes } from '@angular/router';

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
  },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: '/sign-in' },
];
