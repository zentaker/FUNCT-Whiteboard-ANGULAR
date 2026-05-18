// BoardSelectionService
// ---
// Gestiona que objeto del board esta actualmente seleccionado.
//
// Por que un servicio separado de BoardStateService:
//   El estado del documento (objetos, posiciones, contenidos) es algo que algun
//   dia se persistira en una base de datos. La seleccion no: es un estado
//   puramente de UI, transitorio, que no debe viajar con el documento cuando se
//   guarde. Separarlos en servicios distintos refuerza esa distincion conceptual.
//
// Por que se expone selectedObject como computed:
//   Los componentes (panel de propiedades, dispatcher) no quieren el ID suelto;
//   quieren el objeto completo. El computed combina selectedObjectId con la lista
//   de objetos de BoardStateService, asi nadie tiene que hacer el lookup manual.

import { Injectable, computed, inject, signal } from '@angular/core';
import { BoardObject } from '../models/board-object.model';
import { BoardStateService } from './board-state.service';

@Injectable({ providedIn: 'root' })
export class BoardSelectionService {
  private readonly boardState = inject(BoardStateService);

  // ID del objeto actualmente seleccionado, o null si no hay seleccion.
  private readonly selectedObjectIdSignal = signal<string | null>(null);
  readonly selectedObjectId = this.selectedObjectIdSignal.asReadonly();

  // Objeto completo seleccionado, derivado de id + lista de objetos.
  // Si no hay seleccion o el ID ya no existe, devuelve null.
  readonly selectedObject = computed<BoardObject | null>(() => {
    const id = this.selectedObjectIdSignal();
    if (!id) {
      return null;
    }
    return this.boardState.objects().find((object) => object.id === id) ?? null;
  });

  select(id: string): void {
    this.selectedObjectIdSignal.set(id);
  }

  deselect(): void {
    this.selectedObjectIdSignal.set(null);
  }
}
