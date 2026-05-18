// DraggableObjectDirective
// ---
// Hace que cualquier elemento HTML al que se aplique pueda arrastrarse con el mouse.
//
// Como funciona:
//   1. Al hacer mousedown sobre el elemento, registra la posicion del cursor
//      y la posicion inicial del modelo (initialX, initialY).
//   2. Adjunta listeners de mousemove y mouseup al objeto window (NO al elemento).
//      Esto evita que el drag se rompa si el cursor se mueve mas rapido que el
//      elemento y "se sale" del area visible.
//   3. En cada mousemove, calcula la nueva posicion como:
//        nuevaX = posicionInicialDelModelo + (cursorActual - cursorAlEmpezar)
//      Y emite el evento (dragged).
//   4. Al hacer mouseup, libera los listeners.
//
// Por que es una directiva y no un componente:
//   El drag es un comportamiento, no un elemento visual. Una directiva se aplica
//   sobre el elemento que ya existe (en este caso, el host de BoardObjectComponent)
//   sin envolverlo en divs adicionales.
//
// Por que no manipulamos el DOM aqui:
//   La directiva no toca element.style. Solo emite eventos. El parent escucha,
//   llama al servicio, el servicio actualiza un signal, y el DOM se re-renderiza
//   solo porque el template tiene [style.left.px]="object.x". Datos -> DOM,
//   no al reves.

import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Point } from '../../../models/point.model';

@Directive({
  selector: '[appDraggableObject]',
  standalone: true,
})
export class DraggableObjectDirective implements OnDestroy {
  // Posicion del modelo cuando empieza el drag.
  // No es la posicion visual actual del elemento; es la del documento.
  @Input({ required: true }) initialX!: number;
  @Input({ required: true }) initialY!: number;

  // Emitido en cada mousemove durante el drag, con las nuevas coordenadas.
  @Output() dragged = new EventEmitter<Point>();

  // Estado interno del drag. Privado a la directiva, no se expone.
  private isDragging = false;
  private startMouseX = 0;
  private startMouseY = 0;
  private startObjectX = 0;
  private startObjectY = 0;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    // Solo el boton izquierdo inicia drag; otros botones conservan su uso normal.
    if (event.button !== 0) {
      return;
    }

    // Evita seleccion de texto y otros comportamientos por defecto al arrastrar.
    event.preventDefault();

    this.isDragging = true;
    this.startMouseX = event.clientX;
    this.startMouseY = event.clientY;
    this.startObjectX = this.initialX;
    this.startObjectY = this.initialY;

    // Listeners en window: el drag debe sobrevivir aunque el cursor
    // se mueva fuera del elemento original.
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  ngOnDestroy(): void {
    this.stopListeningToWindow();
  }

  // Arrow function para preservar el `this` al pasarla como callback.
  private onMouseMove = (event: MouseEvent): void => {
    if (!this.isDragging) {
      return;
    }

    const deltaX = event.clientX - this.startMouseX;
    const deltaY = event.clientY - this.startMouseY;

    this.dragged.emit({
      x: this.startObjectX + deltaX,
      y: this.startObjectY + deltaY,
    });
  };

  // Arrow function por la misma razon: window invoca el callback fuera de Angular.
  private onMouseUp = (): void => {
    if (!this.isDragging) {
      return;
    }

    this.isDragging = false;
    this.stopListeningToWindow();
  };

  private stopListeningToWindow(): void {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }
}
