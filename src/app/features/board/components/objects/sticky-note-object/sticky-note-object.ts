// StickyNoteObjectComponent
// ---
// Renderiza una nota adhesiva (post-it) en el whiteboard.
//
// Decisiones de diseño:
//  - Recibe el modelo por @Input, no consulta el servicio. Esto lo hace
//    reutilizable y testeable: puedes renderizarlo aislado en Storybook,
//    en un preview, o en un export sin el resto de la app.
//  - Usa Bootstrap card como esqueleto visual. El CSS propio solo añade
//    el cursor 'grab' (anticipando drag-and-drop) y el color de borde.
//  - Desde la Etapa 4, la posición absoluta vive en BoardObjectComponent.
//    Este componente solo dibuja el contenido dentro del espacio recibido.

import { Component, Input } from '@angular/core';
import { BoardObject } from '../../../models/board-object.model';

@Component({
  selector: 'app-sticky-note-object',
  standalone: true,
  templateUrl: './sticky-note-object.html',
  styleUrl: './sticky-note-object.css',
})
export class StickyNoteObjectComponent {
  @Input({ required: true }) stickyNote!: BoardObject;
}
