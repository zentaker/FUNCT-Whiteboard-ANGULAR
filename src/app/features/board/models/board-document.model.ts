// BoardDocument
// ---
// Un whiteboard completo: su metadata + todos los objetos que contiene.
//
// La separación entre BoardDocument y BoardObject importa cuando llegue la
// persistencia real: en Firebase/REST, un BoardDocument vivirá como un
// documento de la colección "boards", y el id es la clave primaria. El
// repositorio (ver repositories/) ya está diseñado para trabajar con este
// modelo, así que cambiar de mock a backend real no toca este archivo.
//
// `createdAt` / `updatedAt` son Date para que sean fáciles de leer al imprimir
// en consola durante el aprendizaje. Si pasamos a JSON serializado en un
// backend, se convierten a strings ISO en la frontera (en el repositorio),
// no aquí.

import { BoardObject } from './board-object.model';

export interface BoardDocument {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  objects: BoardObject[];
}
