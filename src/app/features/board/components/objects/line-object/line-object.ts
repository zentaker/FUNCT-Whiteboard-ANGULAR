// LineObjectComponent
// ---
// Etapa actual: línea horizontal estática. En la Etapa 8 se reemplazará por
// SVG con soporte para ángulos y conectores entre objetos.
//
// Hoy solo renderizamos una franja horizontal de la altura indicada por el
// modelo (típicamente 2px). El sentido pedagógico es validar el flujo
// completo end-to-end (mock → repo → estado → canvas → componente) con
// un quinto tipo de objeto, sin caer en la complejidad de SVG/conectores
// antes de tiempo.
//
// Cuando llegue la etapa de conectores, este archivo recibirá puntos de
// inicio/fin y renderizará un <svg> con un <line> o <path> en su interior.
// El modelo BoardObject probablemente gane campos opcionales como
// `endX`/`endY` o se discrimine como union para el caso 'line'.

import { Component, Input } from '@angular/core';
import { BoardObject } from '../../../models/board-object.model';

@Component({
  selector: 'app-line-object',
  standalone: true,
  templateUrl: './line-object.html',
  styleUrl: './line-object.css',
})
export class LineObjectComponent {
  @Input({ required: true }) line!: BoardObject;
}
