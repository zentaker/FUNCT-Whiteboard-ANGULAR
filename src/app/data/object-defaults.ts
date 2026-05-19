// object-defaults.ts
// ---
// Valores por defecto que reciben los objetos nuevos al ser creados.
//
// Vive en data/ porque son valores configurables, no logica. El dia que
// existan preferencias de usuario (color por defecto de sticky notes, tamano
// preferido, etc.), este archivo es el punto natural donde leerlas.
//
// Omit<BoardObject, 'id' | 'type' | 'x' | 'y'> deja claro que id, type y
// posicion pertenecen al acto de crear, mientras que tamano, contenido y color
// vienen de esta configuracion.

import {
  BoardObject,
  BoardObjectType,
} from '../features/board/models/board-object.model';

export type ObjectDefaults = Omit<BoardObject, 'id' | 'type' | 'x' | 'y'>;

export const OBJECT_DEFAULTS: Record<BoardObjectType, ObjectDefaults> = {
  'sticky-note': {
    width: 180,
    height: 140,
    content: 'Nueva nota',
    backgroundColor: '#FFEB3B',
  },
  rectangle: {
    width: 200,
    height: 120,
    content: 'Nuevo rectangulo',
    backgroundColor: '#E3F2FD',
  },
  text: {
    width: 200,
    height: 60,
    content: 'Nuevo texto',
  },
  'comic-bubble': {
    width: 200,
    height: 130,
    content: 'Hola!',
    backgroundColor: '#F3E5F5',
  },
  line: {
    width: 200,
    height: 24,
    content: '',
  },
};
