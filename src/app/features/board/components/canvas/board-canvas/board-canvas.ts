// BoardCanvasComponent
// ---
// La superficie del whiteboard. Es la zona donde viven todos los objetos
// posicionados absolutamente y donde, en etapas futuras, el usuario
// arrastrará, creará y conectará objetos.
//
// Responsabilidades intencionalmente LIMITADAS en esta etapa:
//
//   1. Lee `objects` de BoardStateService y los itera.
//   2. Por cada objeto, instancia el dispatcher (BoardObjectComponent).
//   3. Provee el contenedor `position: relative` que da sentido al
//      `position-absolute` de los objetos hijos.
//
// Lo que el canvas NO conoce:
//   - Los tipos concretos de objetos (eso lo resuelve el dispatcher).
//   - Cómo se ve cada objeto (eso lo resuelve cada componente visual).
//   - Si hay selección, drag, resize (eso llegará vía componentes hermanos
//     en `interaction/` en etapas futuras).
//
// Mantener este componente pequeño es lo que hace que la arquitectura sea
// extensible: añadir tipos de objetos no requiere tocar el canvas.

import { Component, inject } from '@angular/core';
import { BoardStateService } from '../../../services/board-state.service';
import { BoardObjectComponent } from '../../objects/board-object/board-object';

@Component({
  selector: 'app-board-canvas',
  standalone: true,
  imports: [BoardObjectComponent],
  templateUrl: './board-canvas.html',
  styleUrl: './board-canvas.css',
})
export class BoardCanvasComponent {
  private readonly state = inject(BoardStateService);

  readonly objects = this.state.objects;
}
