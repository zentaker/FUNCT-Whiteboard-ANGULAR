# Selection Box

## Estado: implementada - Etapa 5

Marcador visual del objeto seleccionado. Se renderiza como un outline azul
con esquinas suavemente redondeadas, posicionado 4px fuera del objeto en cada lado.

## Uso

El `BoardObjectComponent` lo renderiza condicionalmente:

```html
@if (isSelected()) {
  <app-selection-box />
}
```

## Por que no recibe inputs

Es un marcador puramente visual. No necesita saber a que objeto rodea ni que
propiedades tiene. Su unica responsabilidad es indicar visualmente que hay seleccion.

## Por que pointer-events: none

Si el outline capturara clicks, no podriamos arrastrar el objeto seleccionado:
el click iria al selection-box, no al objeto. `pointer-events: none` hace que el
outline sea transparente al mouse, dejando que los eventos lleguen al objeto.
