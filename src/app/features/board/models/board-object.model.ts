// BoardObject
// ---
// El "ciudadano" del whiteboard: cualquier cosa que el usuario pueda crear,
// mover y modificar (sticky note, rectángulo, texto, burbuja de cómic, línea).
//
// Decisiones de diseño:
//
// 1. Un solo modelo plano en vez de una jerarquía de interfaces.
//    Podríamos haber hecho `StickyNoteObject extends BoardObject`, etc., pero
//    eso obliga al canvas y al estado a hacer narrowing por tipo cada vez que
//    iteran. Un modelo plano con un campo `type` discriminante es más simple
//    de leer y suficiente para esta etapa. Si un tipo concreto necesita
//    propiedades únicas (por ejemplo, un endpoint para una línea), las añadimos
//    como propiedades opcionales o pasamos a un union type discriminado más
//    adelante.
//
// 2. El campo `type` (BoardObjectType) es lo que el dispatcher
//    (BoardObjectComponent) usa para decidir qué componente visual renderizar.
//    Añadir un tipo nuevo requiere: extender el union, crear un componente
//    visual, añadir una rama @if en el dispatcher. Tres pasos predecibles.
//
// 3. Posición y tamaño en píxeles absolutos. Es la representación más cercana
//    a cómo se renderiza en el DOM (left/top/width/height) y la más fácil de
//    razonar para alguien aprendiendo. En etapas futuras de zoom/pan se
//    introducirá una capa de transformación, no se cambiará este modelo.

export type BoardObjectType =
  | 'sticky-note'
  | 'rectangle'
  | 'text'
  | 'comic-bubble'
  | 'line';

export interface BoardObject {
  id: string;
  type: BoardObjectType;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  backgroundColor?: string;
}
