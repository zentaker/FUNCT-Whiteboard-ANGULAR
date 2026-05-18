# 01 — Folder Structure

La estructura está agrupada por **rol arquitectónico**, no por tipo de
archivo. La meta es que alguien que abre el proyecto por primera vez pueda
hacer este recorrido sin preguntar:

## Quiero ver X → ruta exacta

| Quiero ver…                          | Está en                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------ |
| La página principal                  | `src/app/features/board/pages/board-page/`                               |
| El layout (topbar/toolbar/panel)     | `src/app/features/board/components/layout/`                              |
| El canvas (la superficie)            | `src/app/features/board/components/canvas/board-canvas/`                 |
| El post-it                           | `src/app/features/board/components/objects/sticky-note-object/`          |
| El rectángulo                        | `src/app/features/board/components/objects/rectangle-object/`            |
| El texto libre                       | `src/app/features/board/components/objects/text-object/`                 |
| La burbuja de cómic                  | `src/app/features/board/components/objects/comic-bubble-object/`         |
| La línea                             | `src/app/features/board/components/objects/line-object/`                 |
| Cómo se decide qué pintar            | `src/app/features/board/components/objects/board-object/` (dispatcher)   |
| La data inicial                      | `src/app/data/mock-board.ts`                                             |
| El contrato de persistencia          | `src/app/features/board/repositories/board.repository.ts`                |
| La persistencia local en memoria     | `src/app/features/board/repositories/local-board.repository.ts`          |
| El estado activo                     | `src/app/features/board/services/board-state.service.ts`                 |
| La herramienta activa                | `src/app/features/board/services/board-tool.service.ts`                  |
| Las operaciones sobre objetos        | `src/app/features/board/services/board-object.service.ts`                |
| Los modelos                          | `src/app/features/board/models/`                                         |
| Los componentes de interacción       | `src/app/features/board/components/interaction/` (todos READMEs por ahora) |
| Las rutas                            | `src/app/app.routes.ts`                                                  |
| La configuración global              | `src/app/app.config.ts`                                                  |
| Toda la documentación                | `docs/`                                                                  |

## Por qué esta estructura y no `components/board-canvas/`, `components/sticky-note/`...

Una estructura plana funciona, pero **no cuenta la historia**. Agrupar por
rol arquitectónico (`layout/`, `canvas/`, `objects/`, `interaction/`)
permite que el navegador de archivos lea como un índice:

> Layout — Canvas — Objetos — Interacciones

…que es exactamente cómo se construye un whiteboard.

## Esquema general

```
src/app/
├── data/                                  # Datos de bootstrap
│   └── mock-board.ts
├── features/board/                        # Todo el dominio "whiteboard"
│   ├── models/                            # Tipos puros (contratos)
│   ├── repositories/                      # Persistencia abstracta + impl local
│   ├── services/                          # Estado y operaciones
│   ├── pages/                             # Entradas del router
│   │   └── board-page/
│   └── components/                        # Visuales
│       ├── layout/                        # Topbar, toolbar, shell, panel
│       ├── canvas/                        # Superficie
│       ├── objects/                       # Cada objeto + dispatcher
│       └── interaction/                   # Stubs de futuras interacciones
└── shared/                                # Cosas compartibles (vacío hoy)

docs/                                      # Esta documentación
```
