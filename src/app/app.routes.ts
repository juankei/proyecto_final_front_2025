import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
 
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'preguntas',
    loadComponent: () => import('./preguntas/preguntas.page').then( m => m.PreguntasPage)
  },
  {
    path: 'puntuacion',
    loadComponent: () => import('./puntuacion/puntuacion.page').then( m => m.PuntuacionPage)
  },
  {
    path: 'poderes',
    loadComponent: () => import('./poderes/poderes.page').then( m => m.PoderesPage)
  },
];
