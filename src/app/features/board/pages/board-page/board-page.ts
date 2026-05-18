// BoardPageComponent
// ---
// El punto de entrada del feature "board". Una página en Angular es un
// componente que un router carga directamente: aquí es lo primero que ve
// el usuario al abrir la app.
//
// Esta página es intencionalmente trivial: solo monta el shell. Toda la
// composición visual vive dentro del shell y sus hijos. Tener una página
// separada (en vez de routear directamente al shell) deja espacio para
// añadir más adelante guards, resolvers o lógica específica de la página
// sin tocar el shell, que es un componente reutilizable.

import { Component } from '@angular/core';
import { BoardShellComponent } from '../../components/layout/board-shell/board-shell';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [BoardShellComponent],
  template: `<app-board-shell />`,
  styles: [`:host { display: block; height: 100vh; }`],
})
export class BoardPageComponent {}
