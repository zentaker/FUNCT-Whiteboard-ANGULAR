# selection-box

**Etapa planificada:** Etapa 5 — Selection.

## Qué será

El recuadro visual que aparece alrededor del objeto seleccionado (borde
azul punteado, esquinas marcadas). También capturará el rectángulo de
selección múltiple al arrastrar sobre el canvas vacío.

## Por qué aún no existe

Antes de mostrar una selección necesitamos:

1. Concepto de "objeto seleccionado" en el estado global
   (`BoardStateService` debe ganar `selectedObjectId` como signal).
2. Captura de eventos en el canvas que actualice ese signal al hacer click.
3. Una decisión sobre selección múltiple (Set de ids vs único id).

Crear el componente sin esas piezas previas sería poner el efecto antes
que la causa. Aparecerá en la etapa correspondiente del roadmap.

Ver [docs/07-stage-roadmap.md](../../../../../../../docs/07-stage-roadmap.md).
