// BoardPropertiesPanelComponent
// ---
// Panel derecho donde, en etapas futuras, se mostrarán las propiedades del
// objeto seleccionado (color, tamaño, contenido, posición).
//
// En esta etapa no hay todavía concepto de "objeto seleccionado" en el
// estado, así que el panel muestra un placeholder. Está creado ya para que
// la estructura del shell sea simétrica desde el inicio (topbar, toolbar
// izquierdo, canvas, panel derecho) y para que el lector entienda dónde
// vivirá la inspección de propiedades cuando llegue.

import { Component } from '@angular/core';

@Component({
  selector: 'app-board-properties-panel',
  standalone: true,
  templateUrl: './board-properties-panel.html',
  styleUrl: './board-properties-panel.css',
})
export class BoardPropertiesPanelComponent {}
