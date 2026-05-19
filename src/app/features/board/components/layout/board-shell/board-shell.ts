// BoardShellComponent
// ---
// El "esqueleto" de la pantalla del whiteboard: compone topbar, toolbar
// izquierdo, canvas central y panel de propiedades derecho.
//
// Esta es la unica pieza de layout que conoce a todos sus hijos. Cada uno
// vive en su carpeta y resuelve solo SU pedazo de la UI: el shell los pone
// en su sitio. Si manana cambiamos el layout (por ejemplo a un panel inferior
// en vez de derecho), se cambia aqui y los hijos no se enteran.
//
// El shell tambien dispara `loadBoard` al inicializar. Lo hacemos aqui, y no
// en el servicio, para que el flujo "cargar al montar la pantalla" sea explicito
// y visible al lector que abre este archivo: no hay magia auto-inicializadora
// escondida en el servicio.
//
// Desde la Etapa 5 escucha Delete/Backspace a nivel de window. En la Etapa 7
// tambien captura Escape para salir de herramientas de creacion y volver a
// select. Los atajos globales viven aqui porque el shell envuelve toda la
// experiencia del board.

import { Component, HostListener, OnInit, inject } from '@angular/core';
import { BoardTopbarComponent } from '../board-topbar/board-topbar';
import { BoardToolbarComponent } from '../board-toolbar/board-toolbar';
import { BoardPropertiesPanelComponent } from '../board-properties-panel/board-properties-panel';
import { BoardCanvasComponent } from '../../canvas/board-canvas/board-canvas';
import { BoardStateService } from '../../../services/board-state.service';
import { BoardSelectionService } from '../../../services/board-selection.service';
import { BoardObjectService } from '../../../services/board-object.service';
import { BoardToolService } from '../../../services/board-tool.service';
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
  private readonly selectionService = inject(BoardSelectionService);
  private readonly objectService = inject(BoardObjectService);
  private readonly toolService = inject(BoardToolService);

  async ngOnInit(): Promise<void> {
    await this.state.loadBoard(INITIAL_BOARD_DOCUMENT.id);
  }

  @HostListener('window:keydown', ['$event'])
  async onKeyDown(event: KeyboardEvent): Promise<void> {
    if (event.key === 'Escape') {
      this.toolService.setActiveTool('select');
      this.selectionService.deselect();
      return;
    }

    if (event.key !== 'Delete' && event.key !== 'Backspace') {
      return;
    }

    const selectedId = this.selectionService.selectedObjectId();
    if (!selectedId) {
      return;
    }

    // En etapas futuras, cuando existan inputs editables, este listener debera
    // evitar interceptar Backspace si el foco esta dentro de un campo de texto.
    event.preventDefault();
    await this.objectService.deleteObject(selectedId);
    this.selectionService.deselect();
  }
}
