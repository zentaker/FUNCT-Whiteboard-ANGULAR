// BoardObjectService
// ---
// Operaciones de alto nivel sobre los objetos del tablero. Hoy son dos:
// mover y editar contenido. En etapas futuras crecerá con redimensionar,
// crear, eliminar, agrupar, etc.
//
// Este servicio NO mantiene estado propio. Es una capa muy fina sobre
// BoardStateService que existe por dos razones:
//
// 1. Para que la firma pública de cada operación lea como un verbo del
//    dominio: `moveObject(id, x, y)` en vez de obligar al componente a
//    construir un objeto completo y llamar `state.updateObject(...)`.
//
// 2. Para tener un único lugar donde añadir validaciones (no permitir
//    coordenadas negativas, snapping a grid, redondeo) cuando el proyecto
//    lo necesite. Hoy esas reglas no existen, pero el sitio ya está creado.

import { Injectable, inject } from '@angular/core';
import { BoardStateService } from './board-state.service';

@Injectable({ providedIn: 'root' })
export class BoardObjectService {
  private readonly state = inject(BoardStateService);

  async moveObject(id: string, x: number, y: number): Promise<void> {
    const current = this.state.objects().find((obj) => obj.id === id);
    if (!current) {
      return;
    }
    await this.state.updateObject({ ...current, x, y });
  }

  async updateContent(id: string, content: string): Promise<void> {
    const current = this.state.objects().find((obj) => obj.id === id);
    if (!current) {
      return;
    }
    await this.state.updateObject({ ...current, content });
  }

  async deleteObject(id: string): Promise<void> {
    const current = this.state.objects().find((obj) => obj.id === id);
    if (!current) {
      return;
    }
    await this.state.deleteObject(id);
  }
}
