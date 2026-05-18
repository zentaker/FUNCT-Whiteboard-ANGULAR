// BoardToolbarComponent
// ---
// Panel vertical de herramientas a la izquierda del canvas. Lista las
// herramientas disponibles (definidas en BoardToolService) y resalta la activa.
//
// El componente es deliberadamente "tonto": no decide qué herramientas hay
// (eso lo hace el servicio) ni qué hace cada una al clickear el canvas (eso
// lo hará el canvas en la etapa de Create). Su única responsabilidad es
// pintar los botones y notificar al servicio cuál se eligió.
//
// Hacemos público `toolService` para poder leer `tools` y `activeTool()`
// directamente desde el template. Es seguro porque el servicio expone
// solo señales de lectura y un setter explícito.

import { Component, inject } from '@angular/core';
import { BoardToolService } from '../../../services/board-tool.service';

@Component({
  selector: 'app-board-toolbar',
  standalone: true,
  templateUrl: './board-toolbar.html',
  styleUrl: './board-toolbar.css',
})
export class BoardToolbarComponent {
  readonly toolService = inject(BoardToolService);

  selectTool(toolId: string): void {
    this.toolService.setActiveTool(toolId);
  }
}
