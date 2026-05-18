// BoardStateService
// ---
// El "estado activo" del whiteboard: qué tablero está cargado y qué objetos
// contiene en este momento. Es el ÚNICO puente entre la capa de persistencia
// (LocalBoardRepository) y los componentes de UI.
//
// Decisiones de diseño:
//
// 1. Signals, no RxJS. La reactividad de Angular 17+ con `signal` y `computed`
//    es suficiente para este estado y es radicalmente más fácil de leer para
//    alguien que está aprendiendo. RxJS aparecerá si y solo si llegamos a un
//    caso real que lo requiera (streams asíncronos coordinados, debouncing
//    complejo).
//
// 2. `activeBoard` se expone como signal de solo lectura (`asReadonly()`),
//    `objects` como `computed` derivada. Los componentes NO mutan estos
//    valores; mutan a través de los métodos del servicio. Esta restricción
//    se respeta por convención y por tipos: TypeScript impide reasignar un
//    `Signal<T>` (no tiene `.set`).
//
// 3. Las actualizaciones siempre van por el repositorio primero. Cuando el
//    repo confirma (en el caso local, instantáneo), refrescamos el signal
//    leyendo de nuevo el tablero. Mantenemos así una única fuente de verdad:
//    el repositorio es la base, el signal es la proyección reactiva.
//
// 4. updateObject() es el único punto donde un cambio individual de un objeto
//    se propaga a la persistencia. Cuando reemplacemos LocalBoardRepository
//    por uno real, este método es el lugar donde añadir el side-effect
//    (loading state, manejo de error, optimistic update).

import { Injectable, computed, inject, signal } from '@angular/core';
import { BoardDocument } from '../models/board-document.model';
import { BoardObject } from '../models/board-object.model';
import { LocalBoardRepository } from '../repositories/local-board.repository';

@Injectable({ providedIn: 'root' })
export class BoardStateService {
  private readonly repository = inject(LocalBoardRepository);

  private readonly activeBoardSignal = signal<BoardDocument | null>(null);

  readonly activeBoard = this.activeBoardSignal.asReadonly();

  readonly objects = computed<BoardObject[]>(
    () => this.activeBoardSignal()?.objects ?? [],
  );

  async loadBoard(id: string): Promise<void> {
    const board = await this.repository.getBoard(id);
    this.activeBoardSignal.set(board);
  }

  async updateObject(object: BoardObject): Promise<void> {
    const board = this.activeBoardSignal();
    if (!board) {
      return;
    }
    await this.repository.updateObject(board.id, object);
    const refreshed = await this.repository.getBoard(board.id);
    this.activeBoardSignal.set(refreshed);
  }

  async deleteObject(objectId: string): Promise<void> {
    const board = this.activeBoardSignal();
    if (!board) {
      return;
    }
    await this.repository.deleteObject(board.id, objectId);
    const refreshed = await this.repository.getBoard(board.id);
    this.activeBoardSignal.set(refreshed);
  }
}
