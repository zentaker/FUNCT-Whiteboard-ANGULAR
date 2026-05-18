// BoardShellComponent
// ---
// El "esqueleto" de la pantalla del whiteboard: compone topbar, toolbar
// izquierdo, canvas central y panel de propiedades derecho.
//
// Esta es la única pieza de layout que conoce a todos sus hijos. Cada uno
// vive en su carpeta y resuelve solo SU pedazo de la UI: el shell los pone
// en su sitio. Si mañana cambiamos el layout (por ejemplo a un panel
// inferior en vez de derecho), se cambia aquí y los hijos no se enteran.
//
// El shell también dispara `loadBoard` al inicializar. Lo hacemos aquí, y
// no en el servicio, para que el flujo "cargar al montar la pantalla" sea
// explícito y visible al lector que abre este archivo: no hay magia
// auto-inicializadora escondida en el servicio.

import { Component, OnInit, inject } from '@angular/core';
import { BoardTopbarComponent } from '../board-topbar/board-topbar';
import { BoardToolbarComponent } from '../board-toolbar/board-toolbar';
import { BoardPropertiesPanelComponent } from '../board-properties-panel/board-properties-panel';
import { BoardCanvasComponent } from '../../canvas/board-canvas/board-canvas';
import { BoardStateService } from '../../../services/board-state.service';
import { INITIAL_BOARD_DOCUMENT } from '../../../../../data/mock-board';

@Component({
  selector: 'app-board-shell',
  standalone: true,
  imports: [
    BoardTopbarComponent,
    BoardToolbarComponent,
    BoardPropertiesPanelComponent,
    BoardCanvasComponent,
  ],
  templateUrl: './board-shell.html',
  styleUrl: './board-shell.css',
})
export class BoardShellComponent implements OnInit {
  private readonly state = inject(BoardStateService);

  async ngOnInit(): Promise<void> {
    await this.state.loadBoard(INITIAL_BOARD_DOCUMENT.id);
  }
}
