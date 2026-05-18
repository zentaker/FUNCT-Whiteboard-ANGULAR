# connector-handles

**Etapa planificada:** Etapa 8 — Connectors.

## Qué será

Los puntos de anclaje que aparecen en los lados de un objeto al hacer
hover y desde los cuales el usuario puede arrastrar para crear una línea
conectora con otro objeto. También gestionarán el "snap" a esos anclajes
mientras se dibuja un conector.

## Por qué aún no existe

Connectors requieren rediseñar `LineObject` para usar SVG con puntos de
inicio y fin asociables a otros objetos. Es la etapa que más cambia el
modelo de datos, así que se planifica tarde, después de que Selection,
Resize y Create estén estables.

Aparecerá en la etapa 8. Ver
[docs/07-stage-roadmap.md](../../../../../../../docs/07-stage-roadmap.md).
