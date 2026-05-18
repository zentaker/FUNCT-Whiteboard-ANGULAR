# 03 — Function Map

Cada método público de los servicios y repositorios, con su rol y su
"nota pedagógica" (qué aprende el lector de este método).

## `BoardRepository` (abstract) y `LocalBoardRepository`

Archivo: `src/app/features/board/repositories/board.repository.ts`
Archivo: `src/app/features/board/repositories/local-board.repository.ts`

| Método                          | Propósito                                             | Quién la usa        | Nota pedagógica                                                                                  |
| ------------------------------- | ----------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| `getBoard(id)`                  | Trae el tablero completo. `null` si no existe.        | `BoardStateService` | Ilustra cómo una interfaz abstracta se sustituye por una implementación concreta.                 |
| `saveBoard(board)`              | Reemplaza el tablero entero. Útil para guardado manual.| (etapa de Export)   | Sirve como destino del futuro botón "Guardar". Hoy no se invoca.                                 |
| `updateObject(boardId, object)` | Actualiza un objeto dentro del tablero.               | `BoardStateService` | La operación más frecuente del usuario tiene su propio método en el repo.                        |
| `deleteObject(boardId, id)`     | Elimina un objeto dentro del tablero.                 | `BoardStateService` | Se elimina del documento; el DOM desaparece como consecuencia del signal, no por manipulación.    |

## `BoardStateService`

Archivo: `src/app/features/board/services/board-state.service.ts`

| Método              | Propósito                                             | Quién la usa                   | Nota pedagógica                                                               |
| ------------------- | ----------------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------- |
| `loadBoard(id)`     | Lee del repo y actualiza el signal `activeBoard`.     | `BoardShellComponent.ngOnInit` | Carga inicial explícita en el componente, no magia automática en el servicio. |
| `updateObject(obj)` | Único punto de propagación de cambios a persistencia. | `BoardObjectService`           | Cuando llegue persistencia real, aquí van loading/optimistic/error handling.  |
| `deleteObject(id)`  | Elimina un objeto y refresca el signal `activeBoard`. | `BoardObjectService`           | Mismo flujo que drag: repositorio primero, signal después, DOM al final.      |

Signals expuestos:

| Signal        | Tipo                             | Cómo se usa                                           |
| ------------- | -------------------------------- | ----------------------------------------------------- |
| `activeBoard` | `Signal<BoardDocument \| null>`  | `BoardTopbarComponent` lo lee para mostrar el título. |
| `objects`     | `Signal<BoardObject[]>` computed | `BoardCanvasComponent` lo itera con `@for`.           |

## `BoardSelectionService`

Archivo: `src/app/features/board/services/board-selection.service.ts`

| Método       | Propósito                             | Quién la usa                                 | Nota pedagógica                                                                   |
| ------------ | ------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------- |
| `select(id)` | Guarda el id del objeto seleccionado. | `BoardCanvasComponent`                       | Seleccionar es estado de UI; no modifica el documento persistible.                |
| `deselect()` | Limpia la selección actual.           | `BoardCanvasComponent`, `BoardShellComponent`| Click en canvas vacío y delete comparten el mismo punto de limpieza.              |

Signals expuestos:

| Signal             | Tipo                              | Cómo se usa                                                                  |
| ------------------ | --------------------------------- | ---------------------------------------------------------------------------- |
| `selectedObjectId` | `Signal<string \| null>`          | `BoardObjectComponent` compara contra su propio `object.id`.                 |
| `selectedObject`   | `Signal<BoardObject \| null>`     | `BoardPropertiesPanelComponent` muestra propiedades sin hacer lookup manual. |

## `BoardToolService`

Archivo: `src/app/features/board/services/board-tool.service.ts`

| Método                  | Propósito                                      | Quién la usa            | Nota pedagógica                                                        |
| ----------------------- | ---------------------------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| `setActiveTool(toolId)` | Cambia la herramienta activa con validación.   | `BoardToolbarComponent` | Validación dentro del servicio evita confiar en la UI para integridad. |

Signals expuestos:

| Signal       | Tipo                   | Cómo se usa                                                |
| ------------ | ---------------------- | ---------------------------------------------------------- |
| `tools`      | `readonly BoardTool[]` | `BoardToolbarComponent` itera para pintar los botones.     |
| `activeTool` | `Signal<string>`       | `BoardToolbarComponent` usa para resaltar el botón activo. |

## `BoardObjectService`

Archivo: `src/app/features/board/services/board-object.service.ts`

| Método                 | Propósito                                | Quién la usa             | Nota pedagógica                                                          |
| ---------------------- | ---------------------------------------- | ------------------------ | ------------------------------------------------------------------------ |
| `moveObject(id, x, y)` | Cambia la posición de un objeto.         | `BoardCanvasComponent`   | Capa fina sobre `BoardStateService.updateObject`. Permite añadir reglas. |
| `updateContent(id, c)` | Cambia el contenido textual de un objeto.| (etapa de inline-edit)   | Lugar natural para validación: longitud máxima, sanitización, etc.       |
| `deleteObject(id)`     | Elimina un objeto del board activo.      | `BoardShellComponent`    | Primera mutación disparada por teclado global en vez de mouse.           |
