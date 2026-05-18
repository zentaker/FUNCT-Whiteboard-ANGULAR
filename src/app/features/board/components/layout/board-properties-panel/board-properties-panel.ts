// BoardPropertiesPanelComponent
// ---
// Panel derecho donde se muestran las propiedades del objeto seleccionado
// (id, tipo, posicion, tamano y contenido).
//
// Hasta la Etapa 4 era un placeholder estatico. Desde la Etapa 5 consume el
// computed `selectedObject` de BoardSelectionService. El panel no hace el
// lookup manual por id: el servicio ya combina seleccion (estado de UI) con
// objetos del board (estado del documento).
//
// Por ahora es de solo lectura. En etapas futuras podra editar contenido,
// color, posicion y tamano desde este mismo lugar.

import { Component, inject } from '@angular/core';
import { BoardSelectionService } from '../../../services/board-selection.service';

@Component({
  selector: 'app-board-properties-panel',
  standalone: true,
  templateUrl: './board-properties-panel.html',
  styleUrl: './board-properties-panel.css',
})
export class BoardPropertiesPanelComponent {
  private readonly selectionService = inject(BoardSelectionService);

  readonly selectedObject = this.selectionService.selectedObject;
}
