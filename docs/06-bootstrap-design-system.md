# 06 — Bootstrap as the Design System

## La regla

> **Bootstrap primero. CSS propio solo cuando Bootstrap no puede.**

No inventamos un sistema de cards, botones, badges, paneles ni
espaciados. Eso ya lo resolvió Bootstrap. El CSS propio se reserva para
lo que Bootstrap **no** puede hacer.

## Qué clases de Bootstrap usamos dónde

### Layout

| Dónde                                  | Clases                                                  | Por qué                                                                                  |
| -------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `BoardShellComponent`                  | `d-flex flex-column`, `flex-grow-1`, `overflow-hidden`  | Composición de regiones (topbar arriba, fila debajo) sin escribir flexbox a mano.        |
| `BoardTopbarComponent`                 | `navbar`, `bg-light`, `border-bottom`, `px-3`           | Estética estándar de navbar + separación visual respecto al canvas.                      |
| `BoardToolbarComponent`                | `d-flex flex-column gap-2 p-2`, `border-end`, `bg-white` | Columna vertical de botones con separación uniforme.                                     |
| `BoardPropertiesPanelComponent`        | `border-start`, `bg-white`, `p-3`                       | Panel lateral con separación respecto al canvas.                                         |

### Botones

| Dónde                  | Clases                                                                | Por qué                                                              |
| ---------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Toolbar (activo)       | `btn btn-primary`                                                     | Resaltado de "esta es la herramienta seleccionada".                  |
| Toolbar (inactivo)     | `btn btn-outline-secondary`                                           | Apariencia neutra hasta hover/click.                                 |
| Topbar acciones        | `btn btn-sm btn-outline-secondary`, `btn btn-sm btn-primary`          | Tamaño compacto en una barra densa.                                  |

### Cards

| Dónde                                | Clases                                                              | Por qué                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `StickyNoteObjectComponent`          | `card`, `position-absolute`, `shadow-sm` + header/body/footer       | Esqueleto visual de "tarjetita" sin escribir un solo border-radius.                      |
| `RectangleObjectComponent`           | `card`, `position-absolute`, `shadow-sm` + body/footer              | Misma estética, sin header (más sobrio).                                                 |
| `ComicBubbleObjectComponent`         | `card`, `position-absolute`, `shadow-sm` + body                     | Card como base; el border-radius alto y el rabito van en CSS propio.                     |

### Tipografía y espacio

| Clase                       | Uso                                                              |
| --------------------------- | ---------------------------------------------------------------- |
| `fw-semibold`, `small`      | Énfasis tipográfico ligero.                                      |
| `text-muted`                | Texto secundario (coordenadas, ids).                             |
| `p-2`, `p-3`, `py-1`, `px-2`| Padding consistente; evitamos magic numbers.                     |
| `gap-2`                     | Separación uniforme en flexbox.                                  |
| `mb-0`, `mb-3`              | Reset de márgenes para layouts predecibles.                      |

### Utilidades varias

| Clase                  | Uso                                                                  |
| ---------------------- | -------------------------------------------------------------------- |
| `position-absolute`    | Cada objeto del canvas la usa: el modelo aporta x/y vía inline style. |
| `position-relative`    | Aplicada al contenedor del canvas para anclar el `absolute` de los hijos. |
| `bg-transparent`       | Headers/footers de las cards de objetos para no romper el color de fondo. |
| `border-warning`, etc. | Color de borde semántico (se sustituye con CSS propio cuando es muy fuerte). |
| `alert alert-light`    | Placeholder del properties panel.                                    |

## Casos donde usamos CSS propio (y por qué)

| Caso                                   | Razón                                                                                                                  |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `cursor: grab/grabbing` en los objetos | Bootstrap no expone utilidades de cursor.                                                                              |
| `user-select: none` en los objetos     | Anticipa drag-and-drop; Bootstrap no tiene utilidad equivalente.                                                       |
| Border-radius alto en `ComicBubble`    | `rounded-pill` es agresivo pero no exactamente el efecto que queremos; preferimos un valor explícito.                  |
| "Rabito" de la burbuja                 | Forma específica que no existe como utilidad.                                                                          |
| Color de fondo personalizado           | Los objetos tienen su propio sistema de color (pastel) que no coincide con la paleta de Bootstrap.                     |
| Fondo de puntos del canvas             | Es un `radial-gradient` repetido; Bootstrap no tiene utilidad para grillas.                                            |
| Dimensiones fijas (topbar, toolbar, panel) | Bootstrap tiene utilidades de ancho pero solo en escalones; necesitamos valores específicos (`56px`, `64px`, `280px`). |
| Outline punteado en hover del texto    | `border` de Bootstrap no es punteado por defecto y queremos un efecto sutil.                                           |

## Anti-patrón explícito

❌ No hagas `class="sticky-note custom-shadow my-padding"` con CSS propio
para todo. Si te encuentras escribiendo `padding: 1rem`, probablemente
quieras `p-3` de Bootstrap. Si escribes `display: flex; flex-direction: column`,
quieres `d-flex flex-column`.

El CSS propio se queda **corto a propósito**.
