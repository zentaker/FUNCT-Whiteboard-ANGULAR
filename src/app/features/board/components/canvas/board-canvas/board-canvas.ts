// BoardCanvasComponent
// ---
// La superficie del whiteboard. Lee los objetos del estado, los pinta mediante
// el dispatcher y traduce gestos del usuario en operaciones del dominio.
//
// Desde la Etapa 7, el canvas tambien interpreta el tool activo:
//   - select: click en canvas vacio deselecciona.
//   - herramientas de creacion: click en canvas vacio crea un objeto centrado
//     en ese punto y lo selecciona inmediatamente.
//
// La conversion viewport -> surface vive aqui porque este componente recibe el
// evento del mouse y conoce el elemento DOM que actua como superficie del board.

import {
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { BoardStateService } from '../../../services/board-state.service';
import { BoardObjectService } from '../../../services/board-object.service';
import { BoardSelectionService } from '../../../services/board-selection.service';
import { BoardToolService } from '../../../services/board-tool.service';
import {
  BoardObjectType,
} from '../../../models/board-object.model';
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
  // Referencia al sistema de coordenadas real del board. event.clientX/Y vienen
  // en coordenadas de viewport; restar el rect de surface los convierte a
  // coordenadas internas del canvas.
  @ViewChild('surface', { static: true })
  private surfaceRef!: ElementRef<HTMLElement>;

  private readonly state = inject(BoardStateService);
  private readonly objectService = inject(BoardObjectService);
  private readonly selectionService = inject(BoardSelectionService);
  private readonly toolService = inject(BoardToolService);

  readonly objects = this.state.objects;

  // Cursor derivado del tool activo: crosshair comunica "el proximo click crea".
  readonly canvasCursor = computed(() =>
    this.toolService.activeTool() === 'select' ? 'default' : 'crosshair',
  );

  // El canvas traduce el evento de la directiva en una operacion del dominio.
  // No mueve pixeles manualmente: pide al servicio que cambie el modelo y
  // deja que el signal actualice el template.
  async onObjectDragged(objectId: string, position: Point): Promise<void> {
    await this.objectService.moveObject(objectId, position.x, position.y);
  }

  // Selecciona el objeto antes de que empiece el drag. stopPropagation evita
  // que el mismo mousedown burbujee al canvas y cree/deseleccione.
  onObjectMouseDown(objectId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.selectionService.select(objectId);
  }

  // El click sobre canvas vacio cambia de significado segun el tool activo.
  // Mismo gesto, modo distinto: una pequena introduccion al flujo de apps de
  // diseno como FigJam o Miro.
  async onCanvasMouseDown(event: MouseEvent): Promise<void> {
    if (event.button !== 0) {
      return;
    }

    const tool = this.toolService.activeTool();

    if (tool === 'select') {
      this.selectionService.deselect();
      return;
    }

    if (!this.isCreationTool(tool)) {
      return;
    }

    const point = this.toSurfaceCoordinates(event);
    const newId = await this.objectService.createObject(tool, point.x, point.y);
    this.selectionService.select(newId);
  }

  private toSurfaceCoordinates(event: MouseEvent): Point {
    const rect = this.surfaceRef.nativeElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  private isCreationTool(tool: string): tool is BoardObjectType {
    return (
      tool === 'sticky-note' ||
      tool === 'rectangle' ||
      tool === 'text' ||
      tool === 'comic-bubble' ||
      tool === 'line'
    );
  }
}
