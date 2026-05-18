// BoardTool
// ---
// Representa una herramienta del toolbar izquierdo: Seleccionar, Sticky note,
// Rectángulo, Texto, Burbuja, Línea.
//
// Es un modelo puro de presentación: no contiene la lógica de "qué hace la
// herramienta", solo cómo se etiqueta y se identifica. La lógica vive en
// BoardToolService (qué herramienta está activa) y, en etapas futuras, en
// el canvas (qué hacer al hacer click cuando la herramienta X está activa).
//
// `iconText` se mantiene como texto plano (emoji o sigla) para evitar añadir
// una librería de íconos en esta etapa. Mantenerlo como string también
// significa que el lector ve inmediatamente qué se va a pintar en el botón,
// sin saltar a otro archivo.

export interface BoardTool {
  id: string;
  label: string;
  iconText: string;
}
