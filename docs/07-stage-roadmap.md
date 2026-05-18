# 07 — Stage Roadmap

El proyecto está pensado para crecer en **10 etapas incrementales**. Cada
etapa añade una capacidad sin reescribir las anteriores. **Hoy queda completada
la Etapa 5**: selección de objetos.

| Etapa | Nombre              | Estado        | Qué añade                                                                                      |
| ----- | ------------------- | ------------- | ---------------------------------------------------------------------------------------------- |
| 1     | **Setup**           | ✅ Completada | Proyecto Angular, Bootstrap registrado, build verde.                                           |
| 2     | **Layout**          | ✅ Completada | Shell, topbar, toolbar, properties panel y canvas con grilla.                                  |
| 3     | **Render**          | ✅ Completada | Objetos mock visibles mediante dispatcher y componentes visuales separados.                    |
| 4     | **Drag**            | ✅ Completada | `DraggableObjectDirective` con eventos DOM nativos, aplicada sobre cada `BoardObjectComponent`.|
| 5     | **Selection**       | ✅ Completada | `BoardSelectionService`, outline azul, panel de propiedades y delete con teclado.              |
| 6     | **Resize**          | 🔜            | `ResizeHandlesComponent`. Cambiar tamaño con las 8 asas; reglas de tamaño mínimo/máximo.       |
| 7     | **Create**          | 🔜            | Crear objetos nuevos desde el toolbar haciendo click en el canvas.                             |
| 8     | **Connectors**      | 🔜            | Rediseño de `LineObject` con SVG. `ConnectorHandlesComponent` para anclar a otros objetos.     |
| 9     | **Pan / Zoom**      | 🔜            | Desplazar y hacer zoom del canvas. Transformación CSS o matriz de transformación.              |
| 10    | **Export / Import** | 🔜            | Serialización a JSON. Habilita los botones "Guardar" y "Exportar JSON" del topbar.            |

## Etapa 4 — Drag and drop manual ✅

`DraggableObjectDirective` implementada con eventos DOM nativos.
Aplicada en `BoardCanvasComponent` sobre cada `BoardObjectComponent`.
Posicionamiento refactorizado: ahora vive en el dispatcher, no en los visuales.

El flujo queda así:

```text
mousedown/mousemove → dragged → BoardObjectService.moveObject()
                    → BoardStateService.updateObject()
                    → signal actualizado → template re-renderizado
```

## Etapa 5 — Selección de objetos ✅

`BoardSelectionService` creado para estado de UI.
`SelectionBoxComponent` renderiza outline azul.
Click en objeto selecciona; click en canvas vacío deselecciona.
El panel de propiedades muestra datos del objeto seleccionado.
Delete/Backspace elimina el seleccionado.

El flujo de selección queda así:

```text
mousedown en objeto → BoardSelectionService.select(id)
                    → BoardObjectComponent.isSelected()
                    → SelectionBoxComponent visible
                    → BoardPropertiesPanelComponent muestra selectedObject()
```

## Principios del roadmap

1. **Cada etapa deja la app funcional.** Después de cada merge la pantalla
   sigue mostrándose y los tests siguen pasando.
2. **Cada etapa toca pocos archivos.** Si una etapa rompe la arquitectura,
   es señal de que el diseño anterior debe revisarse, no de que la etapa
   sea inevitable.
3. **El roadmap no es un commitment.** Es una guía. Si alguien aprendiendo
   prefiere implementar una etapa en otro orden, la arquitectura debería
   permitirlo cuando las dependencias conceptuales estén claras.

## Mapa "etapa → archivos esperados"

| Etapa              | Archivos nuevos esperados                                                     | Servicios que crecen              |
| ------------------ | ----------------------------------------------------------------------------- | --------------------------------- |
| 4 — Drag           | `interaction/draggable-object/draggable-object.directive.ts`                  | `BoardObjectService.moveObject`   |
| 5 — Selection      | `selection-box/selection-box.{ts,html,css}`, `board-selection.service.ts`     | `BoardObjectService.deleteObject` |
| 6 — Resize         | `resize-handles/resize-handles.{ts,html,css}`                                 | `BoardObjectService.resizeObject` |
| 7 — Create         | `BoardCanvasComponent` gana click handler dependiente de `activeTool`         | `BoardObjectService.createObject` |
| 8 — Connectors     | `LineObject` reescrito en SVG, `connector-handles/`, modelo extendido         | `BoardObjectService.connectObjects` |
| 9 — Pan / Zoom     | `viewport.service.ts` con signals `pan` y `zoom`, transformación en el canvas | nuevo `ViewportService`           |
| 10 — Export/Import | Handlers en `BoardTopbarComponent`, `board-import-export.service.ts`          | nuevo servicio de I/O             |
