# Resize Handles

## Estado: implementada - Etapa 6

Componente que añade 4 handles (circulos blancos con borde azul) en las
esquinas del objeto seleccionado para permitir redimensionarlo.

## Uso

El `BoardObjectComponent` lo renderiza condicionalmente:

```html
@if (isSelected()) {
  <app-resize-handles [object]="object" />
}
```

## Por que todo vive en este componente

El resize es una operacion con estado compartido durante el drag: la esquina
activa, los valores iniciales del objeto y la posicion inicial del cursor.
Dividir esa logica en directivas individuales por handle obligaria a
sincronizarlas externamente, lo que no aporta claridad.

## El patron pointer-events none / auto

El contenedor de los handles llena toda el area del objeto pero es transparente
al mouse. Solo los circulos de 12x12 px capturan eventos. Esto permite que el
objeto siga siendo clickeable y arrastrable en toda su superficie excepto en
las 4 esquinas.

## Minimos y anclaje

El objeto no puede ser mas pequeno que 40x40 px. Cuando se alcanza el minimo
arrastrando desde una esquina izquierda o superior, el borde opuesto se mantiene
anclado en su posicion original. Sin este ajuste, el objeto se desplazaria al
chocar con el minimo.
