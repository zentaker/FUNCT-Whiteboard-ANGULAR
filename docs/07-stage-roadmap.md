# 07 — Stage Roadmap

El proyecto está pensado para crecer en **10 etapas incrementales**. Cada
etapa añade una capacidad sin reescribir las anteriores. **Hoy estamos
terminando la etapa 2** (Layout + Render).

| Etapa | Nombre               | Estado          | Qué añade                                                                                         |
| ----- | -------------------- | --------------- | -------------------------------------------------------------------------------------------------- |
| 1     | **Setup**            | ✅ Completada   | Proyecto Angular, Bootstrap registrado, build verde.                                               |
| 2     | **Layout + Render**  | ✅ Completada   | Shell, topbar, toolbar, properties panel, canvas con grilla y objetos pintados desde el estado.    |
| 3     | **Drag**             | ⏳ Próxima     | Arrastrar objetos en el canvas. Listeners de mouse, cálculo de offset, persistencia vía servicio.   |
| 4     | **Selection**        | 🔜             | Concepto de "objeto seleccionado". `SelectionBoxComponent`. Highlight visual + properties panel real. |
| 5     | **Resize**           | 🔜             | `ResizeHandlesComponent`. Cambiar tamaño con las 8 asas; reglas de tamaño mínimo/máximo.            |
| 6     | **Create**           | 🔜             | Crear objetos nuevos desde el toolbar haciendo click en el canvas.                                  |
| 7     | **Inline edit**      | 🔜             | Editar contenido de notas/textos/burbujas haciendo doble click.                                     |
| 8     | **Connectors**       | 🔜             | Rediseño de `LineObject` con SVG. `ConnectorHandlesComponent` para anclar a otros objetos.          |
| 9     | **Pan / Zoom**       | 🔜             | Desplazar y hacer zoom del canvas. Transformación CSS o matriz de transformación.                   |
| 10    | **Export / Import**  | 🔜             | Serialización a JSON. Habilita los botones "Guardar" y "Exportar JSON" del topbar.                  |

## Principios del roadmap

1. **Cada etapa deja la app funcional.** Después de cada merge la pantalla
   sigue mostrándose y los tests siguen pasando.
2. **Cada etapa toca pocos archivos.** Si una etapa rompe la arquitectura,
   es señal de que el diseño anterior debe revisarse, no de que la etapa
   sea inevitable.
3. **El roadmap no es un commitment.** Es una guía. Si alguien aprendiendo
   prefiere implementar Selection antes que Drag, la arquitectura debería
   permitirlo (en este caso lo permite: cada etapa toca componentes
   distintos).

## Mapa "etapa → archivos esperados"

| Etapa        | Archivos nuevos esperados                                                         | Servicios que crecen                 |
| ------------ | --------------------------------------------------------------------------------- | ------------------------------------ |
| 3 — Drag     | Listeners en `BoardObjectComponent`, `pointer.service.ts` (opcional)              | `BoardObjectService.moveObject`      |
| 4 — Select   | `selection-box/selection-box.{ts,html,css}`, signal `selectedObjectId`            | `BoardStateService` + nuevo método   |
| 5 — Resize   | `resize-handles/resize-handles.{ts,html,css}`                                     | `BoardObjectService.resizeObject`    |
| 6 — Create   | `BoardCanvasComponent` gana click handler dependiente de `activeTool`            | `BoardObjectService.createObject`    |
| 7 — Edit     | Modo edición en cada objeto (probablemente `@Input() editing: boolean`)          | `BoardObjectService.updateContent`   |
| 8 — Connect  | `LineObject` reescrito en SVG, `connector-handles/`, modelo extendido            | `BoardObjectService.connectObjects`  |
| 9 — Pan/Zoom | `viewport.service.ts` con signals `pan` y `zoom`, transformación en el canvas    | nuevo `ViewportService`              |
| 10 — IO      | Handlers en `BoardTopbarComponent`, `board-import-export.service.ts`             | nuevo servicio de I/O                |
