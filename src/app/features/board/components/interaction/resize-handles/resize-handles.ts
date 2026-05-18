// ResizeHandlesComponent
// ---
// Renderiza 4 handles en las esquinas del objeto seleccionado y gestiona el
// resize mediante drag manual.
//
// Por que todo vive en un solo componente:
//   Los 4 handles comparten estado durante el drag: que esquina esta activa,
//   los valores iniciales del objeto y la posicion inicial del cursor.
//   Separarlos en directivas individuales obligaria a sincronizarlos por fuera,
//   lo que no aporta claridad.
//
// Por que no usa BoardSelectionService:
//   Solo se renderiza cuando ya hay seleccion. El dispatcher decide eso y le
//   pasa el objeto por @Input, asi que no hace falta consultar la seleccion otra
//   vez desde aqui.
//
// El truco de pointer-events:
//   El contenedor .resize-handles llena todo el area del objeto, pero
//   pointer-events: none lo hace transparente al mouse. Cada handle individual
//   tiene pointer-events: auto, capturando clicks solo en sus 12x12 px.

import { Component, Input, OnDestroy, inject } from '@angular/core';
import { BoardObject } from '../../../models/board-object.model';
import { BoardObjectService } from '../../../services/board-object.service';

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ResizeDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-resize-handles',
  standalone: true,
  templateUrl: './resize-handles.html',
  styleUrl: './resize-handles.css',
})
export class ResizeHandlesComponent implements OnDestroy {
  @Input({ required: true }) object!: BoardObject;

  private readonly objectService = inject(BoardObjectService);

  // Si bajara de aqui, el objeto podria volverse dificil de seleccionar.
  private readonly MIN_WIDTH = 40;
  private readonly MIN_HEIGHT = 40;

  // Estado del resize activo. null significa que no hay gesto en curso.
  private activeCorner: Corner | null = null;

  // Snapshot tomado en mousedown. Todo mousemove parte de estos valores para
  // evitar drift por redondeos o por leer el objeto ya actualizado.
  private startMouseX = 0;
  private startMouseY = 0;
  private startObjectX = 0;
  private startObjectY = 0;
  private startObjectWidth = 0;
  private startObjectHeight = 0;

  onHandleMouseDown(corner: Corner, event: MouseEvent): void {
    if (event.button !== 0) {
      return;
    }

    // Sin stopPropagation, el mousedown llegaria a DraggableObjectDirective y
    // el objeto entero se moveria mientras intentamos redimensionarlo.
    event.preventDefault();
    event.stopPropagation();

    this.activeCorner = corner;
    this.startMouseX = event.clientX;
    this.startMouseY = event.clientY;
    this.startObjectX = this.object.x;
    this.startObjectY = this.object.y;
    this.startObjectWidth = this.object.width;
    this.startObjectHeight = this.object.height;

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  ngOnDestroy(): void {
    this.stopListeningToWindow();
  }

  // Arrow function para preservar `this` cuando window invoque el callback.
  private onMouseMove = (event: MouseEvent): void => {
    if (!this.activeCorner) {
      return;
    }

    const deltaX = event.clientX - this.startMouseX;
    const deltaY = event.clientY - this.startMouseY;
    const next = this.computeNewDimensions(this.activeCorner, deltaX, deltaY);

    void this.objectService.resizeObject(
      this.object.id,
      next.x,
      next.y,
      next.width,
      next.height,
    );
  };

  private onMouseUp = (): void => {
    this.activeCorner = null;
    this.stopListeningToWindow();
  };

  // Traduce el delta del cursor a nuevas dimensiones segun la esquina activa.
  //
  // Las esquinas izquierdas cambian x y width. Las esquinas superiores cambian
  // y y height. Cuando se alcanza el minimo desde izquierda o arriba, se ancla
  // el borde opuesto para que el objeto no tiemble ni se desplace solo.
  private computeNewDimensions(
    corner: Corner,
    deltaX: number,
    deltaY: number,
  ): ResizeDimensions {
    let x = this.startObjectX;
    let y = this.startObjectY;
    let width = this.startObjectWidth;
    let height = this.startObjectHeight;

    switch (corner) {
      case 'top-left':
        x = this.startObjectX + deltaX;
        y = this.startObjectY + deltaY;
        width = this.startObjectWidth - deltaX;
        height = this.startObjectHeight - deltaY;
        break;
      case 'top-right':
        y = this.startObjectY + deltaY;
        width = this.startObjectWidth + deltaX;
        height = this.startObjectHeight - deltaY;
        break;
      case 'bottom-left':
        x = this.startObjectX + deltaX;
        width = this.startObjectWidth - deltaX;
        height = this.startObjectHeight + deltaY;
        break;
      case 'bottom-right':
        width = this.startObjectWidth + deltaX;
        height = this.startObjectHeight + deltaY;
        break;
    }

    if (width < this.MIN_WIDTH) {
      if (corner === 'top-left' || corner === 'bottom-left') {
        x = this.startObjectX + (this.startObjectWidth - this.MIN_WIDTH);
      }
      width = this.MIN_WIDTH;
    }

    if (height < this.MIN_HEIGHT) {
      if (corner === 'top-left' || corner === 'top-right') {
        y = this.startObjectY + (this.startObjectHeight - this.MIN_HEIGHT);
      }
      height = this.MIN_HEIGHT;
    }

    return { x, y, width, height };
  }

  private stopListeningToWindow(): void {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }
}
