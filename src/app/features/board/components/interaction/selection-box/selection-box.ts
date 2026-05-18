// SelectionBoxComponent
// ---
// Marcador visual de seleccion. Se renderiza alrededor del objeto seleccionado
// para indicar visualmente que esta activo.
//
// Decisiones:
//  - No recibe inputs. Es puramente visual. Quien decide cuando aparece es el
//    dispatcher (BoardObjectComponent), no este componente.
//  - Usa pointer-events: none en CSS para no interferir con clicks sobre el
//    objeto que esta rodeando. Si los capturara, no podriamos hacer drag.
//  - Usa inset: -4px para posicionarse 4px fuera del objeto en cada lado,
//    dando la sensacion de "borde flotante" sin solaparse con el contenido.

import { Component } from '@angular/core';

@Component({
  selector: 'app-selection-box',
  standalone: true,
  templateUrl: './selection-box.html',
  styleUrl: './selection-box.css',
})
export class SelectionBoxComponent {}
