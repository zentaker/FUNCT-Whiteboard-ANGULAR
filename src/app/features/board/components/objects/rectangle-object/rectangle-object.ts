// RectangleObjectComponent
// ---
// Renderiza un rectángulo de proceso/contenedor en el whiteboard.
//
// Sigue el mismo patrón que StickyNoteObjectComponent (ver allí los
// fundamentos): recibe el modelo por @Input, usa Bootstrap card como
// esqueleto y limita el CSS propio a lo que Bootstrap no resuelve.
//
// Es deliberadamente más sobrio que la nota: sin header, solo cuerpo y un
// pie pequeño con las coordenadas. Es la metáfora visual de un "bloque"
// neutro que el usuario etiquetará.

import { Component, Input } from '@angular/core';
import { BoardObject } from '../../../models/board-object.model';

@Component({
  selector: 'app-rectangle-object',
  standalone: true,
  templateUrl: './rectangle-object.html',
  styleUrl: './rectangle-object.css',
})
export class RectangleObjectComponent {
  @Input({ required: true }) rectangle!: BoardObject;
}
