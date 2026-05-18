// BoardTopbarComponent
// ---
// Barra superior del whiteboard. Muestra el título del tablero y dos
// acciones globales: "Guardar" y "Exportar JSON".
//
// En esta etapa los botones no hacen nada todavía: queremos que el lector
// vea la estructura del layout y entienda DÓNDE viven las acciones globales
// antes de implementar su lógica. Los handlers reales aparecerán en la
// etapa de Export/Import (etapa 10 del roadmap).
//
// Lee el título directamente de BoardStateService.activeBoard() porque la
// barra es una proyección del estado activo. Si no hay tablero cargado
// todavía (durante el primer tick), mostramos un placeholder.

import { Component, computed, inject } from '@angular/core';
import { BoardStateService } from '../../../services/board-state.service';

@Component({
  selector: 'app-board-topbar',
  standalone: true,
  templateUrl: './board-topbar.html',
  styleUrl: './board-topbar.css',
})
export class BoardTopbarComponent {
  private readonly state = inject(BoardStateService);

  readonly title = computed(
    () => this.state.activeBoard()?.title ?? 'Whiteboard',
  );
}
