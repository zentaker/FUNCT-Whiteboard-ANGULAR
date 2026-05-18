# 02 — Board Data Flow

Memoriza este diagrama. Toda decisión arquitectónica del proyecto lo
respeta:

```
┌─────────────────────┐
│  mock-board.ts      │  Data inicial (no es BD, simula carga)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ LocalBoardRepository│  Capa de persistencia simulada.
│  (implementa        │  Mañana podría ser FirebaseBoardRepository
│  BoardRepository)   │  sin tocar nada más.
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ BoardStateService   │  Estado activo. Único puente entre
│  (signals)          │  persistencia y componentes.
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ BoardCanvasComponent│  Recorre objects(), no decide cómo se ven.
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ BoardObjectComponent│  Dispatcher por type. Sin lógica visual.
└──────────┬──────────┘
           │
   ┌───────┼────────┬─────────────┬──────────────┐
   ▼       ▼        ▼             ▼              ▼
StickyNote Rect    Text       ComicBubble       Line
```

## Cada capa explicada

### 1. `mock-board.ts` — Data inicial

Un objeto literal `INITIAL_BOARD_DOCUMENT` que representa el estado de
fábrica del tablero. Hoy sirve para que la app tenga algo que mostrar al
arrancar. Cuando llegue persistencia real, este archivo deja de cargarse
(el repositorio real trae la data del backend).

### 2. `LocalBoardRepository` — Persistencia simulada

Implementa la **interfaz abstracta** `BoardRepository` con un
`Map<string, BoardDocument>` en memoria. Es la única capa que conoce el
almacenamiento. Las firmas son `Promise<…>` para que pasar a un backend
real no obligue a cambiar las llamadas.

Más detalle en [05-local-mock-persistence.md](05-local-mock-persistence.md).

### 3. `BoardStateService` — Estado activo

Expone `activeBoard` (signal readonly) y `objects` (computed). Es el
**único** que habla con el repositorio. Los componentes consumen el
estado vía signals y disparan mutaciones llamando métodos del servicio
(o de `BoardObjectService`, que delega aquí).

### 4. `BoardCanvasComponent` — La superficie

Lee `objects()` del estado, itera con `@for`, y por cada objeto monta un
dispatcher. No conoce los tipos concretos.

### 5. `BoardObjectComponent` — El dispatcher

Mira `object.type` y delega al componente visual correcto vía `@if`. No
contiene lógica visual propia.

### 6. Componentes visuales

`StickyNoteObject`, `RectangleObject`, `TextObject`,
`ComicBubbleObject`, `LineObject`. Cada uno recibe el objeto por
`@Input`, lo renderiza con Bootstrap + CSS propio mínimo, y no habla con
el servicio. Son "tontos" a propósito: testeables, reutilizables,
predecibles.

## Reglas que se desprenden

1. `BoardCanvasComponent` **no conoce** los tipos de objetos. Solo los
   renderiza vía dispatcher.
2. Los componentes visuales (StickyNote, Rectangle, etc.) **no llaman al
   servicio**. Reciben data por `@Input` y emitirán cambios por `@Output`
   en etapas futuras.
3. `BoardStateService` es el **único** que habla con el repositorio.
4. El repositorio implementa una interfaz abstracta para que sea
   reemplazable.
