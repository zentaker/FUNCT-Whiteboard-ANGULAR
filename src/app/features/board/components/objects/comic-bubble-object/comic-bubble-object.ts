// ComicBubbleObjectComponent
// ---
// Renderiza una burbuja de cómic con un "rabito" inferior izquierdo,
// pensada para representar pensamientos, comentarios o citas dentro del
// tablero.
//
// Sigue el patrón del sticky note (Bootstrap card como esqueleto) con dos
// añadidos:
//
//   1. border-radius muy alto (≥20px) para la forma orgánica de globo de
//      cómic. Bootstrap no tiene una utilidad rounded-* tan agresiva, así
//      que va en el CSS propio.
//
//   2. El "rabito" (tail) lo dibujamos con el truco clásico de bordes en
//      un pseudo-elemento ::before. No es magia: es un div de 0×0 con tres
//      bordes transparentes y uno coloreado, lo que produce un triángulo.

import { Component, Input } from '@angular/core';
import { BoardObject } from '../../../models/board-object.model';

@Component({
  selector: 'app-comic-bubble-object',
  standalone: true,
  templateUrl: './comic-bubble-object.html',
  styleUrl: './comic-bubble-object.css',
})
export class ComicBubbleObjectComponent {
  @Input({ required: true }) comicBubble!: BoardObject;
}
