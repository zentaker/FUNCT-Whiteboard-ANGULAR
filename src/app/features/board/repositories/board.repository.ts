// BoardRepository (interfaz abstracta)
// ---
// Define el contrato que cualquier implementación de persistencia debe cumplir
// para que el resto de la app funcione.
//
// Usamos una `abstract class` en vez de una `interface` por una razón muy
// concreta de Angular: una clase abstracta es un token de DI válido. Esto nos
// permite inyectar `BoardRepository` y dejar que Angular sustituya con la
// implementación concreta que registremos (LocalBoardRepository hoy,
// FirebaseBoardRepository mañana). Con una interface no podríamos hacer eso
// sin un InjectionToken adicional.
//
// Los métodos son intencionalmente pocos y de granularidad media:
//
//   - getBoard(id):       trae un tablero completo. Se usa al cargar la app.
//   - saveBoard(board):   reemplaza un tablero entero. Útil para "Guardar"
//                         manual y para importación.
//   - updateObject(...):  actualiza UN objeto dentro de un tablero. Esta es
//                         la operación más frecuente (cada drag, cada edit) y
//                         queremos que el repo la entienda directamente, sin
//                         obligar al servicio a leer-modificar-guardar.
//
// Devuelven Promise para que la firma sea la misma con un backend real, donde
// las operaciones son asíncronas por naturaleza.

import { BoardDocument } from '../models/board-document.model';
import { BoardObject } from '../models/board-object.model';

export abstract class BoardRepository {
  abstract getBoard(id: string): Promise<BoardDocument | null>;
  abstract saveBoard(board: BoardDocument): Promise<void>;
  abstract updateObject(boardId: string, object: BoardObject): Promise<void>;
  abstract deleteObject(boardId: string, objectId: string): Promise<void>;
}
