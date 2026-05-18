# 04 — Component Map

Mapa completo de los componentes, directivas y servicios de UI del proyecto en
esta etapa.

## Page

| Componente           | Archivo                                         | Capa | Propósito                        | Usado por       | Nota pedagógica                          |
| -------------------- | ----------------------------------------------- | ---- | -------------------------------- | --------------- | ---------------------------------------- |
| `BoardPageComponent` | `features/board/pages/board-page/board-page.ts` | Page | Entrada de ruta. Monta el shell. | `app.routes.ts` | Página trivial, deliberadamente delgada. |

## Layout

| Componente                      | Archivo                                                                          | Capa   | Propósito                                             | Usado por             |
| ------------------------------- | -------------------------------------------------------------------------------- | ------ | ----------------------------------------------------- | --------------------- |
| `BoardShellComponent`           | `features/board/components/layout/board-shell/board-shell.ts`                    | Layout | Compone la pantalla y escucha Delete/Backspace.       | `BoardPageComponent`  |
| `BoardTopbarComponent`          | `features/board/components/layout/board-topbar/board-topbar.ts`                  | Layout | Barra superior con título y acciones globales.        | `BoardShellComponent` |
| `BoardToolbarComponent`         | `features/board/components/layout/board-toolbar/board-toolbar.ts`                | Layout | Columna vertical con las herramientas.                | `BoardShellComponent` |
| `BoardPropertiesPanelComponent` | `features/board/components/layout/board-properties-panel/board-properties-panel.ts` | Layout | Panel derecho con propiedades del objeto seleccionado.| `BoardShellComponent` |

**Nota pedagógica:** el shell es la única pieza de layout que conoce a todos
sus hijos. Desde la Etapa 5 también es el lugar natural para atajos globales
de teclado.

## Canvas

| Componente             | Archivo                                                         | Capa   | Propósito                                                   | Usado por             |
| ---------------------- | --------------------------------------------------------------- | ------ | ----------------------------------------------------------- | --------------------- |
| `BoardCanvasComponent` | `features/board/components/canvas/board-canvas/board-canvas.ts` | Canvas | Itera objetos, conecta drag, selecciona y deselecciona.     | `BoardShellComponent` |

**Nota pedagógica:** el canvas no conoce los tipos concretos de objetos. Sí
coordina eventos de interacción porque es la superficie donde ocurren.

## Objects

| Componente                   | Archivo                                                                        | Capa    | Propósito                                                                  | Usado por              |
| ---------------------------- | ------------------------------------------------------------------------------ | ------- | -------------------------------------------------------------------------- | ---------------------- |
| `BoardObjectComponent`       | `features/board/components/objects/board-object/board-object.ts`               | Objects | Dispatcher. Delega al visual correcto y muestra selection-box si aplica.   | `BoardCanvasComponent` |
| `StickyNoteObjectComponent`  | `features/board/components/objects/sticky-note-object/sticky-note-object.ts`   | Objects | Renderiza una nota adhesiva.                                               | `BoardObjectComponent` |
| `RectangleObjectComponent`   | `features/board/components/objects/rectangle-object/rectangle-object.ts`       | Objects | Renderiza un rectángulo de proceso.                                        | `BoardObjectComponent` |
| `TextObjectComponent`        | `features/board/components/objects/text-object/text-object.ts`                 | Objects | Renderiza texto libre sin contenedor.                                      | `BoardObjectComponent` |
| `ComicBubbleObjectComponent` | `features/board/components/objects/comic-bubble-object/comic-bubble-object.ts` | Objects | Renderiza una burbuja de cómic con rabito.                                 | `BoardObjectComponent` |
| `LineObjectComponent`        | `features/board/components/objects/line-object/line-object.ts`                 | Objects | Renderiza una línea horizontal simple, placeholder para conectores.        | `BoardObjectComponent` |

**Nota pedagógica:** todos los visuales reciben el modelo por `@Input` y no
llaman al servicio. La selección se consulta en el dispatcher, no en cada visual.

## Interaction

| Pieza                      | Archivo                                                                                       | Capa        | Propósito                                                        | Usado por              |
| -------------------------- | --------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------- | ---------------------- |
| `DraggableObjectDirective` | `features/board/components/interaction/draggable-object/draggable-object.directive.ts`         | Interaction | Agrega drag-and-drop manual a cualquier elemento con eventos DOM.| `BoardCanvasComponent` |
| `SelectionBoxComponent`    | `features/board/components/interaction/selection-box/selection-box.ts`                         | Interaction | Dibuja el outline azul alrededor del objeto seleccionado.        | `BoardObjectComponent` |

**Nota pedagógica:** `SelectionBoxComponent` no recibe inputs. Es un indicador
puramente visual y usa `pointer-events: none` para no interceptar clicks ni drag.

## State (UI)

| Servicio                | Archivo                                              | Capa       | Propósito                                           | Usado por                                                                 |
| ----------------------- | ---------------------------------------------------- | ---------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| `BoardSelectionService` | `features/board/services/board-selection.service.ts` | State (UI) | Guarda qué objeto está seleccionado en la interfaz. | `BoardObjectComponent`, `BoardCanvasComponent`, `BoardPropertiesPanelComponent`, `BoardShellComponent` |

**Nota pedagógica:** la selección no vive en `BoardStateService` porque no es
parte del documento persistible. Es estado transitorio de UI.

## Interaction (placeholders restantes)

| Carpeta                                                    | Etapa planificada | Por qué aún no existe                                    |
| ---------------------------------------------------------- | ----------------- | -------------------------------------------------------- |
| `features/board/components/interaction/resize-handles/`    | Etapa 6           | Depende de Selection y de un coordinador de interacción. |
| `features/board/components/interaction/connector-handles/` | Etapa 8           | Requiere rediseño de `LineObject` con SVG.               |

Cada carpeta contiene un README que explica el plan.
