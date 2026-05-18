# resize-handles

**Etapa planificada:** Etapa 6 — Resize.

## Qué será

Las ocho asas (cuatro esquinas + cuatro lados) que permiten redimensionar
un objeto seleccionado arrastrando con el ratón. Se renderizan encima del
SelectionBox, por lo que dependen de que la selección ya exista.

## Por qué aún no existe

Resize requiere:

1. Que `selection-box` esté implementado (etapa 5).
2. Un servicio de "interacción activa" para coordinar drag vs resize sin
   que se pisen los eventos del mouse.
3. Reglas de tamaño mínimo y máximo, aún no definidas en los modelos.

Aparecerá tras Selection. Ver
[docs/07-stage-roadmap.md](../../../../../../../docs/07-stage-roadmap.md).
