# 03 — Function Map

Cada método público de los servicios y repositorios, con su rol y su
"nota pedagógica" (qué aprende el lector de este método).

## `BoardRepository` (abstract) y `LocalBoardRepository`

Archivo: `src/app/features/board/repositories/board.repository.ts`
Archivo: `src/app/features/board/repositories/local-board.repository.ts`

| Método                          | Propósito                                                    | Quién la usa           | Nota pedagógica                                                                                  |
| ------------------------------- | ------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------ |
| `getBoard(id)`                  | Trae el tablero completo. `null` si no existe.               | `BoardStateService`    | Ilustra cómo una interfaz abstracta se inyecta y se sustituye por implementación concreta.        |
| `saveBoard(board)`              | Reemplaza el tablero entero. Útil para guardado manual.      | (etapa de Export)      | Sirve como destino del futuro botón "Guardar". Hoy no se invoca.                                  |
| `updateObject(boardId, object)` | Actualiza un objeto dentro del tablero.                      | `BoardStateService`    | Granularidad media: la operación más frecuente del usuario tiene su propio método en el repo.    |

## `BoardStateService`

Archivo: `src/app/features/board/services/board-state.service.ts`

| Método                | Propósito                                              | Quién la usa                          | Nota pedagógica                                                                            |
| --------------------- | ------------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------ |
| `loadBoard(id)`       | Lee del repo y actualiza el signal `activeBoard`.      | `BoardShellComponent.ngOnInit`        | Carga inicial explícita en el componente, no magia automática en el servicio.              |
| `updateObject(obj)`   | Único punto de propagación a la persistencia.          | `BoardObjectService`                  | Cuando llegue persistencia real, aquí van loading/optimistic/error handling.               |

Y dos signals expuestos:

| Signal           | Tipo                          | Cómo se usa                                              |
| ---------------- | ----------------------------- | -------------------------------------------------------- |
| `activeBoard`    | `Signal<BoardDocument | null>` | `BoardTopbarComponent` lo lee para mostrar el título.    |
| `objects`        | `Signal<BoardObject[]>` (computed) | `BoardCanvasComponent` lo itera con `@for`.          |

## `BoardToolService`

Archivo: `src/app/features/board/services/board-tool.service.ts`

| Método                   | Propósito                                          | Quién la usa             | Nota pedagógica                                                       |
| ------------------------ | -------------------------------------------------- | ------------------------ | --------------------------------------------------------------------- |
| `setActiveTool(toolId)`  | Cambia la herramienta activa (con validación).     | `BoardToolbarComponent`  | Validación dentro del servicio evita confiar en la UI para integridad. |

Signals expuestos:

| Signal        | Tipo                       | Cómo se usa                                                    |
| ------------- | -------------------------- | -------------------------------------------------------------- |
| `tools`       | `readonly BoardTool[]`     | `BoardToolbarComponent` itera para pintar los botones.         |
| `activeTool`  | `Signal<string>`           | `BoardToolbarComponent` usa para resaltar el botón activo.     |

## `BoardObjectService`

Archivo: `src/app/features/board/services/board-object.service.ts`

| Método                  | Propósito                                  | Quién la usa                       | Nota pedagógica                                                          |
| ----------------------- | ------------------------------------------ | ---------------------------------- | ------------------------------------------------------------------------ |
| `moveObject(id, x, y)`  | Cambia la posición de un objeto.            | (etapa de Drag, etapa 4)           | Capa fina sobre `BoardStateService.updateObject`. Permite añadir reglas. |
| `updateContent(id, c)`  | Cambia el contenido textual de un objeto.   | (etapa de inline-edit, etapa 5/7) | Lugar natural para validación (longitud máxima, sanitización).           |
