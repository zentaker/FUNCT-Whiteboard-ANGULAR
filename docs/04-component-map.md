# 04 — Component Map

Mapa completo de los componentes, directivas y servicios de UI del proyecto en
esta etapa.

## Page

| Componente           | Archivo                                         | Capa | Proposito                        | Usado por       | Nota pedagogica                         |
| -------------------- | ----------------------------------------------- | ---- | -------------------------------- | --------------- | --------------------------------------- |
| `BoardPageComponent` | `features/board/pages/board-page/board-page.ts` | Page | Entrada de ruta. Monta el shell. | `app.routes.ts` | Pagina trivial, deliberadamente delgada. |

## Layout

| Componente                      | Archivo                                                                            | Capa   | Proposito                                             | Usado por             |
| ------------------------------- | ---------------------------------------------------------------------------------- | ------ | ----------------------------------------------------- | --------------------- |
| `BoardShellComponent`           | `features/board/components/layout/board-shell/board-shell.ts`                      | Layout | Compone la pantalla y escucha Delete/Backspace.       | `BoardPageComponent`  |
| `BoardTopbarComponent`          | `features/board/components/layout/board-topbar/board-topbar.ts`                    | Layout | Barra superior con titulo y acciones globales.        | `BoardShellComponent` |
| `BoardToolbarComponent`         | `features/board/components/layout/board-toolbar/board-toolbar.ts`                  | Layout | Columna vertical con las herramientas.                | `BoardShellComponent` |
| `BoardPropertiesPanelComponent` | `features/board/components/layout/board-properties-panel/board-properties-panel.ts` | Layout | Panel derecho con propiedades del objeto seleccionado.| `BoardShellComponent` |

**Nota pedagogica:** el shell es la unica pieza de layout que conoce a todos
sus hijos. Desde la Etapa 5 tambien es el lugar natural para atajos globales
de teclado.

## Canvas

| Componente             | Archivo                                                         | Capa   | Proposito                                               | Usado por             |
| ---------------------- | --------------------------------------------------------------- | ------ | ------------------------------------------------------- | --------------------- |
| `BoardCanvasComponent` | `features/board/components/canvas/board-canvas/board-canvas.ts` | Canvas | Itera objetos, conecta drag, selecciona y deselecciona. | `BoardShellComponent` |

**Nota pedagogica:** el canvas no conoce los tipos concretos de objetos. Si
coordina eventos de interaccion porque es la superficie donde ocurren.

## Objects

| Componente                   | Archivo                                                                        | Capa    | Proposito                                                                | Usado por              |
| ---------------------------- | ------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------ | ---------------------- |
| `BoardObjectComponent`       | `features/board/components/objects/board-object/board-object.ts`               | Objects | Dispatcher. Delega al visual y muestra selection/resize si aplica.       | `BoardCanvasComponent` |
| `StickyNoteObjectComponent`  | `features/board/components/objects/sticky-note-object/sticky-note-object.ts`   | Objects | Renderiza una nota adhesiva.                                             | `BoardObjectComponent` |
| `RectangleObjectComponent`   | `features/board/components/objects/rectangle-object/rectangle-object.ts`       | Objects | Renderiza un rectangulo de proceso.                                      | `BoardObjectComponent` |
| `TextObjectComponent`        | `features/board/components/objects/text-object/text-object.ts`                 | Objects | Renderiza texto libre sin contenedor.                                    | `BoardObjectComponent` |
| `ComicBubbleObjectComponent` | `features/board/components/objects/comic-bubble-object/comic-bubble-object.ts` | Objects | Renderiza una burbuja de comic con rabito.                               | `BoardObjectComponent` |
| `LineObjectComponent`        | `features/board/components/objects/line-object/line-object.ts`                 | Objects | Renderiza una linea horizontal simple, placeholder para conectores.       | `BoardObjectComponent` |

**Nota pedagogica:** todos los visuales reciben el modelo por `@Input` y no
llaman al servicio. La seleccion y resize se conectan en el dispatcher, no en
cada visual.

## Interaction

| Pieza                      | Archivo                                                                                       | Capa        | Proposito                                                        | Usado por              |
| -------------------------- | --------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------- | ---------------------- |
| `DraggableObjectDirective` | `features/board/components/interaction/draggable-object/draggable-object.directive.ts`         | Interaction | Agrega drag-and-drop manual a cualquier elemento con eventos DOM.| `BoardCanvasComponent` |
| `SelectionBoxComponent`    | `features/board/components/interaction/selection-box/selection-box.ts`                         | Interaction | Dibuja el outline azul alrededor del objeto seleccionado.        | `BoardObjectComponent` |
| `ResizeHandlesComponent`   | `features/board/components/interaction/resize-handles/resize-handles.ts`                       | Interaction | Renderiza 4 handles y traduce su drag a nuevas dimensiones.      | `BoardObjectComponent` |

**Nota pedagogica:** `ResizeHandlesComponent` reutiliza el patron
`mousedown -> window mousemove -> mouseup`, pero con matematica por esquina.
Aplica minimos de 40x40 y ancla el borde opuesto cuando corresponde.

## State (UI)

| Servicio                | Archivo                                              | Capa       | Proposito                                           | Usado por                                                                 |
| ----------------------- | ---------------------------------------------------- | ---------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| `BoardSelectionService` | `features/board/services/board-selection.service.ts` | State (UI) | Guarda que objeto esta seleccionado en la interfaz. | `BoardObjectComponent`, `BoardCanvasComponent`, `BoardPropertiesPanelComponent`, `BoardShellComponent` |

**Nota pedagogica:** la seleccion no vive en `BoardStateService` porque no es
parte del documento persistible. Es estado transitorio de UI.

## Interaction (placeholders restantes)

| Carpeta                                                    | Etapa planificada | Por que aun no existe                      |
| ---------------------------------------------------------- | ----------------- | ------------------------------------------ |
| `features/board/components/interaction/connector-handles/` | Etapa 8           | Requiere rediseno de `LineObject` con SVG. |

Cada carpeta contiene un README que explica el plan.
