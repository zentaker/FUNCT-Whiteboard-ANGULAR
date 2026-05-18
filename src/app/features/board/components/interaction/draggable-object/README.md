# Draggable Object Directive

## Estado: implementada - Etapa 4

Directiva que añade comportamiento de arrastre a cualquier elemento mediante
eventos DOM nativos (`mousedown`, `mousemove`, `mouseup`).

## Uso

```html
<app-board-object
  [object]="object"
  appDraggableObject
  [initialX]="object.x"
  [initialY]="object.y"
  (dragged)="onObjectDragged(object.id, $event)"
/>
```

## Por que directiva y no servicio o componente

- **No componente**: el drag no se ve, es comportamiento.
- **No servicio**: el servicio no debe conocer eventos del DOM.
- **Directiva**: se acopla al elemento, escucha eventos nativos y emite eventos Angular limpios.

## Por que los listeners van en window

Si el cursor se mueve mas rapido que el elemento durante el drag, sale del area
del elemento. Si el listener estuviera en el elemento, el drag se rompería.
`window` captura el `mousemove` sin importar donde este el cursor en la pantalla.

## Flujo pedagogico

La directiva no cambia `element.style.left` ni `element.style.top`. Solo emite
coordenadas nuevas. `BoardCanvasComponent` escucha ese evento, llama a
`BoardObjectService.moveObject()`, el servicio actualiza el signal y Angular
vuelve a pintar el host de `BoardObjectComponent`.
