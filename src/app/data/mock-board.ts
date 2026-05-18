// mock-board.ts
// ---
// La data inicial con la que arranca el whiteboard en esta etapa.
//
// Esto NO es la persistencia: es el "estado de fábrica" que el repositorio
// local usa para sembrar su Map en memoria. Cuando reemplacemos el repositorio
// por uno real (Firebase, REST), este archivo simplemente deja de cargarse
// y el repositorio real se conecta al backend.
//
// El documento incluye uno de cada tipo de objeto (sticky note, rectángulo,
// texto, burbuja de cómic, línea) para que al arrancar la app el lector vea
// en pantalla que el dispatcher funciona y que cada componente visual
// realmente existe.

import { BoardDocument } from '../features/board/models/board-document.model';

export const INITIAL_BOARD_DOCUMENT: BoardDocument = {
  id: 'demo-board',
  title: 'Tablero de demostración',
  createdAt: new Date('2026-01-01T10:00:00Z'),
  updatedAt: new Date('2026-01-01T10:00:00Z'),
  objects: [
    {
      id: 'obj-sticky-1',
      type: 'sticky-note',
      x: 80,
      y: 80,
      width: 200,
      height: 150,
      content: 'Esta es una nota adhesiva. Sirve para anotar ideas sueltas.',
      backgroundColor: '#FFEB3B',
    },
    {
      id: 'obj-rect-1',
      type: 'rectangle',
      x: 340,
      y: 80,
      width: 220,
      height: 140,
      content: 'Bloque de proceso',
      backgroundColor: '#E3F2FD',
    },
    {
      id: 'obj-text-1',
      type: 'text',
      x: 80,
      y: 280,
      width: 280,
      height: 40,
      content: 'Texto libre sin contenedor',
    },
    {
      id: 'obj-comic-1',
      type: 'comic-bubble',
      x: 420,
      y: 270,
      width: 220,
      height: 130,
      content: '¡Hola! Soy una burbuja de cómic.',
      backgroundColor: '#F3E5F5',
    },
    {
      id: 'obj-line-1',
      type: 'line',
      x: 80,
      y: 430,
      width: 560,
      height: 2,
      content: '',
    },
  ],
};
