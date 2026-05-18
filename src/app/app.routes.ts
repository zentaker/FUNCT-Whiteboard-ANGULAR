// Rutas de la app
// ---
// Por ahora una sola ruta: la raíz redirige a la página del whiteboard.
// `loadComponent` con dynamic import permite que el bundle de la página
// se cargue perezosamente, manteniendo el chunk inicial pequeño. Es la
// forma recomendada en Angular standalone.

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/board/pages/board-page/board-page').then(
        (m) => m.BoardPageComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
