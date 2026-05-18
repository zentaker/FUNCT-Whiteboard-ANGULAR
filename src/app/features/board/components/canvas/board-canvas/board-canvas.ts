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
import { BoardObjectService } from '../../../services/board-object.service';
import { BoardSelectionService } from '../../../services/board-selection.service';
import { Point } from '../../../models/point.model';
import { DraggableObjectDirective } from '../../interaction/draggable-object/draggable-object.directive';
import { BoardObjectComponent } from '../../objects/board-object/board-object';

@Component({
  selector: 'app-board-canvas',
  standalone: true,
  imports: [BoardObjectComponent, DraggableObjectDirective],
  templateUrl: './board-canvas.html',
  styleUrl: './board-canvas.css',
})
export class BoardCanvasComponent {
  private readonly state = inject(BoardStateService);
  private readonly objectService = inject(BoardObjectService);
  private readonly selectionService = inject(BoardSelectionService);

  readonly objects = this.state.objects;

  // El canvas traduce el evento de la directiva en una operacion del dominio.
  // No mueve pixeles manualmente: pide al servicio que cambie el modelo y
  // deja que el signal actualice el template.
  async onObjectDragged(objectId: string, position: Point): Promise<void> {
    await this.objectService.moveObject(objectId, position.x, position.y);
  }

  // Selecciona el objeto antes de que empiece el drag. stopPropagation evita
  // que el mismo mousedown burbujee al canvas y borre la seleccion.
  onObjectMouseDown(objectId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.selectionService.select(objectId);
  }

  // Mousedown en canvas vacio deselecciona. Si el evento viene de un objeto,
  // no llega aqui porque onObjectMouseDown detiene el bubbling.
  onCanvasMouseDown(): void {
    this.selectionService.deselect();
  }
}
