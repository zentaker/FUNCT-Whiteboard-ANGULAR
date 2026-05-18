// App (componente raíz)
// ---
// El componente raíz monta solo el <router-outlet>. Toda la pantalla del
// whiteboard vive bajo la ruta `''`, que carga BoardPageComponent (ver
// app.routes.ts). Mantener el componente raíz mínimo facilita añadir
// rutas hermanas más adelante (login, configuración, lista de tableros)
// sin reescribir esta capa.

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
