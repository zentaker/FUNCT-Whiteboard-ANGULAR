# 04 — Component Map

Mapa completo de los componentes del proyecto en esta etapa.

## Page

| Componente            | Archivo                                                                 | Capa | Propósito                              | Usado por        | Nota pedagógica                                       |
| --------------------- | ----------------------------------------------------------------------- | ---- | -------------------------------------- | ---------------- | ----------------------------------------------------- |
| `BoardPageComponent`  | `features/board/pages/board-page/board-page.ts`                         | Page | Entrada de ruta. Monta el shell.       | `app.routes.ts`  | Página trivial, deliberadamente delgada.              |

## Layout

| Componente                       | Archivo                                                                          | Capa   | Propósito                                                    | Usado por             |
| -------------------------------- | -------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------ | --------------------- |
| `BoardShellComponent`            | `features/board/components/layout/board-shell/board-shell.ts`                    | Layout | Compone topbar + toolbar + canvas + properties panel.        | `BoardPageComponent`  |
| `BoardTopbarComponent`           | `features/board/components/layout/board-topbar/board-topbar.ts`                  | Layout | Barra superior con título y acciones globales.               | `BoardShellComponent` |
| `BoardToolbarComponent`          | `features/board/components/layout/board-toolbar/board-toolbar.ts`                | Layout | Columna vertical con las herramientas.                       | `BoardShellComponent` |
| `BoardPropertiesPanelComponent`  | `features/board/components/layout/board-properties-panel/board-properties-panel.ts` | Layout | Panel derecho (vacío en esta etapa).                         | `BoardShellComponent` |

**Nota pedagógica:** el shell es la única pieza de layout que conoce a
todos sus hijos. Cada hijo resuelve solo su pedazo de UI. Si cambia el
layout, se cambia aquí y los hijos no se enteran.

## Canvas

| Componente              | Archivo                                                                 | Capa   | Propósito                                                 | Usado por             |
| ----------------------- | ----------------------------------------------------------------------- | ------ | --------------------------------------------------------- | --------------------- |
| `BoardCanvasComponent`  | `features/board/components/canvas/board-canvas/board-canvas.ts`         | Canvas | Superficie del whiteboard. Itera objetos del estado.       | `BoardShellComponent` |

**Nota pedagógica:** el canvas no conoce los tipos concretos de objetos.
Solo conoce `BoardObject` genérico y deja que el dispatcher resuelva.

## Objects

| Componente                     | Archivo                                                                              | Capa    | Propósito                                                          | Usado por                 |
| ------------------------------ | ------------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------ | ------------------------- |
| `BoardObjectComponent`         | `features/board/components/objects/board-object/board-object.ts`                     | Objects | **Dispatcher.** Mira `type` y delega al componente visual correcto. | `BoardCanvasComponent`    |
| `StickyNoteObjectComponent`    | `features/board/components/objects/sticky-note-object/sticky-note-object.ts`         | Objects | Renderiza una nota adhesiva.                                       | `BoardObjectComponent`    |
| `RectangleObjectComponent`     | `features/board/components/objects/rectangle-object/rectangle-object.ts`             | Objects | Renderiza un rectángulo de proceso.                                | `BoardObjectComponent`    |
| `TextObjectComponent`          | `features/board/components/objects/text-object/text-object.ts`                       | Objects | Renderiza texto libre sin contenedor.                              | `BoardObjectComponent`    |
| `ComicBubbleObjectComponent`   | `features/board/components/objects/comic-bubble-object/comic-bubble-object.ts`       | Objects | Renderiza una burbuja de cómic con rabito.                         | `BoardObjectComponent`    |
| `LineObjectComponent`          | `features/board/components/objects/line-object/line-object.ts`                       | Objects | Renderiza una línea horizontal simple (placeholder etapa 8).       | `BoardObjectComponent`    |

**Nota pedagógica:** todos los visuales reciben el modelo por `@Input` y
NO llaman al servicio. Eso los hace testeables aislados.

## Interaction (placeholders)

| Carpeta                                                                       | Etapa planificada | Por qué aún no existe                                                |
| ----------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------- |
| `features/board/components/interaction/selection-box/`                        | Etapa 5           | Necesita `selectedObjectId` en estado y captura de eventos de click. |
| `features/board/components/interaction/resize-handles/`                       | Etapa 6           | Depende de Selection y de un coordinador de interacción.             |
| `features/board/components/interaction/connector-handles/`                    | Etapa 8           | Requiere rediseño de `LineObject` con SVG.                           |

Cada carpeta contiene un README que explica el plan.
