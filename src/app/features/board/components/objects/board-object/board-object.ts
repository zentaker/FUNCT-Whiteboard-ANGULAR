// BoardObjectComponent (dispatcher)
// ---
// El dispatcher mira el `type` del objeto y delega el renderizado al
// componente visual correcto. NO contiene lógica visual propia: si añades
// código de estilos o de cálculo aquí, está en el sitio equivocado.
//
// Por qué este patrón en vez de un componente genérico con clases
// condicionales:
//
//   - Cuando alguien busca "el post-it" debe encontrar un archivo llamado
//     `sticky-note-object.ts`, no un condicional dentro de un catch-all.
//   - Añadir un tipo nuevo es siempre los mismos 3 pasos: extender el union
//     BoardObjectType, crear el componente visual, añadir una rama @if aquí.
//   - El canvas se mantiene completamente ignorante de los tipos concretos:
//     solo conoce `BoardObject` genérico y deja que el dispatcher resuelva.
//
// El @if (en vez de @switch) es para que el lector vea exactamente qué
// componente se dispara por cada tipo, en orden. @switch funcionaría
// igualmente bien; el @if con cinco ramas explícitas es más narrativo.

import { Component, Input, computed, inject } from '@angular/core';
import { BoardObject } from '../../../models/board-object.model';
import { BoardSelectionService } from '../../../services/board-selection.service';
import { StickyNoteObjectComponent } from '../sticky-note-object/sticky-note-object';
import { RectangleObjectComponent } from '../rectangle-object/rectangle-object';
import { TextObjectComponent } from '../text-object/text-object';
import { ComicBubbleObjectComponent } from '../comic-bubble-object/comic-bubble-object';
import { LineObjectComponent } from '../line-object/line-object';
import { SelectionBoxComponent } from '../../interaction/selection-box/selection-box';
import { ResizeHandlesComponent } from '../../interaction/resize-handles/resize-handles';

@Component({
  selector: 'app-board-object',
  standalone: true,
  imports: [
    StickyNoteObjectComponent,
    RectangleObjectComponent,
    TextObjectComponent,
    ComicBubbleObjectComponent,
    LineObjectComponent,
    SelectionBoxComponent,
    ResizeHandlesComponent,
  ],
  templateUrl: './board-object.html',
  styleUrl: './board-object.css',
  // El dispatcher es responsable de la posicion. Los visuales solo dibujan
  // dentro del espacio que este host les entrega.
  host: {
    class: 'position-absolute',
    '[style.left.px]': 'object.x',
    '[style.top.px]': 'object.y',
    '[style.width.px]': 'object.width',
    '[style.height.px]': 'object.height',
  },
})
export class BoardObjectComponent {
  @Input({ required: true }) object!: BoardObject;

  private readonly selectionService = inject(BoardSelectionService);

  // Computed: true si este objeto es el actualmente seleccionado.
  // El template lo usa para decidir si renderiza el SelectionBoxComponent.
  readonly isSelected = computed(
    () => this.selectionService.selectedObjectId() === this.object.id,
  );
}
