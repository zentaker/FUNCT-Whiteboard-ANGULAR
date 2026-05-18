// BoardToolService
// ---
// Mantiene la lista de herramientas disponibles en el toolbar y cuál está
// activa en este momento.
//
// La separación respecto a BoardStateService es deliberada: las herramientas
// son un concepto de UI (qué hace el siguiente click en el canvas), no de
// dominio (qué hay en el tablero). Mezclarlos haría que el estado del
// whiteboard se "ensucie" con preocupaciones de interacción.
//
// `tools` es un array readonly inicializado una sola vez. Si añadimos
// herramientas nuevas (forma de estrella, conector, lápiz a mano alzada),
// se añaden aquí y aparecerán automáticamente en el toolbar, sin tocar
// componentes.

import { Injectable, signal } from '@angular/core';
import { BoardTool } from '../models/board-tool.model';

@Injectable({ providedIn: 'root' })
export class BoardToolService {
  readonly tools: readonly BoardTool[] = [
    { id: 'select', label: 'Seleccionar', iconText: '⬚' },
    { id: 'sticky-note', label: 'Nota', iconText: '📝' },
    { id: 'rectangle', label: 'Rectángulo', iconText: '▭' },
    { id: 'text', label: 'Texto', iconText: 'T' },
    { id: 'comic-bubble', label: 'Burbuja', iconText: '💬' },
    { id: 'line', label: 'Línea', iconText: '─' },
  ];

  private readonly activeToolSignal = signal<string>('select');

  readonly activeTool = this.activeToolSignal.asReadonly();

  setActiveTool(toolId: string): void {
    const exists = this.tools.some((tool) => tool.id === toolId);
    if (!exists) {
      return;
    }
    this.activeToolSignal.set(toolId);
  }
}
