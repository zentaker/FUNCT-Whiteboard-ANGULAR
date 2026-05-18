// TextObjectComponent
// ---
// Renderiza un bloque de texto libre, sin contenedor visual: solo letras
// dentro del contenedor que BoardObjectComponent posiciona en el canvas.
//
// Por qué SIN Bootstrap card aquí: a diferencia de un sticky note o un
// rectángulo, el texto libre no tiene "contenedor" conceptual. Forzarlo
// dentro de una card lo haría verse como un objeto más cuando en realidad
// queremos que se sienta "plano" sobre el canvas, como rotular un diagrama.
//
// El outline punteado en :hover anticipa la futura edición inline: al pasar
// el mouse el lector ve que ese texto es interactivo, antes incluso de que
// la edición esté implementada.

import { Component, Input } from '@angular/core';
import { BoardObject } from '../../../models/board-object.model';

@Component({
  selector: 'app-text-object',
  standalone: true,
  templateUrl: './text-object.html',
  styleUrl: './text-object.css',
})
export class TextObjectComponent {
  @Input({ required: true }) textObject!: BoardObject;
}
