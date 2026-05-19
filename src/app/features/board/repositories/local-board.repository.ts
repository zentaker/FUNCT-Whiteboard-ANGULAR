// LocalBoardRepository
// ---
// Implementación en memoria de BoardRepository. Es la única capa que conoce
// el "almacenamiento" en esta etapa del proyecto.
//
// Por qué un Map en memoria y no localStorage / IndexedDB todavía:
//
//   - Queremos que el lector entienda PRIMERO el patrón Repositorio (separar
//     el dominio de la persistencia). Añadir serialización a localStorage
//     introduce preocupaciones nuevas (JSON.stringify de Dates, versionado de
//     esquemas, manejo de quota) que distraen del concepto principal.
//   - Reiniciar la app borra el estado, y eso ES INTENCIONAL en esta etapa:
//     cada recarga vuelve al INITIAL_BOARD_DOCUMENT y es predecible para
//     experimentar.
//
// Cuando reemplaces esto por FirebaseBoardRepository (o cualquier otra
// implementación real), ninguna otra capa de la app debería cambiar: el
// servicio inyecta el mismo `BoardRepository` abstracto y los componentes
// ni siquiera saben que existe persistencia.

import { Injectable } from '@angular/core';
import { BoardDocument } from '../models/board-document.model';
import { BoardObject } from '../models/board-object.model';
import { INITIAL_BOARD_DOCUMENT } from '../../../data/mock-board';
import { BoardRepository } from './board.repository';

@Injectable({ providedIn: 'root' })
export class LocalBoardRepository extends BoardRepository {
  private readonly boards = new Map<string, BoardDocument>();

  constructor() {
    super();
    this.boards.set(INITIAL_BOARD_DOCUMENT.id, INITIAL_BOARD_DOCUMENT);
  }

  async getBoard(id: string): Promise<BoardDocument | null> {
    return this.boards.get(id) ?? null;
  }

  async saveBoard(board: BoardDocument): Promise<void> {
    this.boards.set(board.id, { ...board, updatedAt: new Date() });
  }

  async addObject(boardId: string, object: BoardObject): Promise<void> {
    const board = this.boards.get(boardId);
    if (!board) {
      throw new Error(`No existe el tablero con id "${boardId}"`);
    }

    this.boards.set(boardId, {
      ...board,
      objects: [...board.objects, object],
      updatedAt: new Date(),
    });
  }

  async updateObject(boardId: string, object: BoardObject): Promise<void> {
    const board = this.boards.get(boardId);
    if (!board) {
      throw new Error(`No existe el tablero con id "${boardId}"`);
    }
    const nextObjects = board.objects.map((obj) =>
      obj.id === object.id ? object : obj,
    );
    this.boards.set(boardId, {
      ...board,
      objects: nextObjects,
      updatedAt: new Date(),
    });
  }

  async deleteObject(boardId: string, objectId: string): Promise<void> {
    const board = this.boards.get(boardId);
    if (!board) {
      throw new Error(`No existe el tablero con id "${boardId}"`);
    }

    const nextObjects = board.objects.filter((obj) => obj.id !== objectId);
    this.boards.set(boardId, {
      ...board,
      objects: nextObjects,
      updatedAt: new Date(),
    });
  }
}
