# 03 — Function Map

Cada metodo publico de los servicios y repositorios, con su rol y su
"nota pedagogica" (que aprende el lector de este metodo).

## `BoardRepository` (abstract) y `LocalBoardRepository`

Archivo: `src/app/features/board/repositories/board.repository.ts`
Archivo: `src/app/features/board/repositories/local-board.repository.ts`

| Metodo                          | Proposito                                             | Quien la usa        | Nota pedagogica                                                                                |
| ------------------------------- | ----------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| `getBoard(id)`                  | Trae el tablero completo. `null` si no existe.        | `BoardStateService` | Ilustra como una interfaz abstracta se sustituye por una implementacion concreta.              |
| `saveBoard(board)`              | Reemplaza el tablero entero. Util para guardado manual.| (etapa de Export)   | Sirve como destino del futuro boton "Guardar". Hoy no se invoca.                               |
| `addObject(boardId, object)`    | Agrega un objeto ya construido al tablero.            | `BoardStateService` | El repositorio no conoce defaults ni genera ids; solo persiste lo que recibe.                  |
| `updateObject(boardId, object)` | Actualiza un objeto dentro del tablero.               | `BoardStateService` | La operacion mas frecuente del usuario tiene su propio metodo en el repo.                      |
| `deleteObject(boardId, id)`     | Elimina un objeto dentro del tablero.                 | `BoardStateService` | Se elimina del documento; el DOM desaparece como consecuencia del signal, no por manipulacion. |

## `BoardStateService`

Archivo: `src/app/features/board/services/board-state.service.ts`

| Metodo              | Proposito                                             | Quien la usa                   | Nota pedagogica                                                            |
| ------------------- | ----------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------- |
| `loadBoard(id)`     | Lee del repo y actualiza el signal `activeBoard`.     | `BoardShellComponent.ngOnInit` | Carga inicial explicita en el componente, no magia automatica en el servicio. |
| `addObject(obj)`    | Agrega un objeto al documento activo y refresca signal.| `BoardObjectService`           | Simetrico a `deleteObject`: repositorio primero, signal despues.              |
| `updateObject(obj)` | Unico punto de propagacion de cambios a persistencia. | `BoardObjectService`           | Cuando llegue persistencia real, aqui van loading/optimistic/error handling. |
| `deleteObject(id)`  | Elimina un objeto y refresca el signal `activeBoard`. | `BoardObjectService`           | Mismo flujo que drag: repositorio primero, signal despues, DOM al final.   |

Signals expuestos:

| Signal        | Tipo                            | Como se usa                                           |
| ------------- | ------------------------------- | ----------------------------------------------------- |
| `activeBoard` | `Signal<BoardDocument \| null>` | `BoardTopbarComponent` lo lee para mostrar el titulo. |
| `objects`     | `Signal<BoardObject[]>` computed| `BoardCanvasComponent` lo itera con `@for`.           |

## `BoardSelectionService`

Archivo: `src/app/features/board/services/board-selection.service.ts`

| Metodo       | Proposito                             | Quien la usa                                  | Nota pedagogica                                                    |
| ------------ | ------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| `select(id)` | Guarda el id del objeto seleccionado. | `BoardCanvasComponent`                        | Seleccionar es estado de UI; no modifica el documento persistible. |
| `deselect()` | Limpia la seleccion actual.           | `BoardCanvasComponent`, `BoardShellComponent` | Click en canvas vacio y delete comparten el mismo punto de limpieza. |

Signals expuestos:

| Signal             | Tipo                             | Como se usa                                                                  |
| ------------------ | -------------------------------- | ---------------------------------------------------------------------------- |
| `selectedObjectId` | `Signal<string \| null>`         | `BoardObjectComponent` compara contra su propio `object.id`.                 |
| `selectedObject`   | `Signal<BoardObject \| null>`    | `BoardPropertiesPanelComponent` muestra propiedades sin hacer lookup manual. |

## `BoardToolService`

Archivo: `src/app/features/board/services/board-tool.service.ts`

| Metodo                  | Proposito                                    | Quien la usa            | Nota pedagogica                                                        |
| ----------------------- | -------------------------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| `setActiveTool(toolId)` | Cambia la herramienta activa con validacion. | `BoardToolbarComponent` | Validacion dentro del servicio evita confiar en la UI para integridad. |

Signals expuestos:

| Signal       | Tipo                   | Como se usa                                                |
| ------------ | ---------------------- | ---------------------------------------------------------- |
| `tools`      | `readonly BoardTool[]` | `BoardToolbarComponent` itera para pintar los botones.     |
| `activeTool` | `Signal<string>`       | `BoardToolbarComponent` usa para resaltar el boton activo. |

## `BoardObjectService`

Archivo: `src/app/features/board/services/board-object.service.ts`

| Metodo                                  | Proposito                                             | Quien la usa             | Nota pedagogica                                                                                 |
| --------------------------------------- | ----------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- |
| `moveObject(id, x, y)`                  | Cambia la posicion de un objeto.                      | `BoardCanvasComponent`   | Capa fina sobre `BoardStateService.updateObject`. Permite anadir reglas.                        |
| `updateContent(id, c)`                  | Cambia el contenido textual de un objeto.             | (etapa de inline-edit)   | Lugar natural para validacion: longitud maxima, sanitizacion, etc.                              |
| `createObject(type, centerX, centerY)`  | Crea un objeto nuevo usando `OBJECT_DEFAULTS`.        | `BoardCanvasComponent`   | Primer metodo que construye una entidad nueva. Usa `crypto.randomUUID()` para evitar colisiones. |
| `resizeObject(id, x, y, width, height)` | Actualiza posicion y dimensiones simultaneamente.     | `ResizeHandlesComponent` | La posicion puede cambiar si el resize viene desde una esquina izquierda o superior.             |
| `deleteObject(id)`                      | Elimina un objeto del board activo.                   | `BoardShellComponent`    | Primera mutacion disparada por teclado global en vez de mouse.                                  |
