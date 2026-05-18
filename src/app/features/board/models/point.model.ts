// Point
// ---
// Coordenada 2D usada por toda la app: posición de un objeto, posición del
// cursor durante un drag, esquinas de un bounding box, etc.
//
// Está aislado en su propio archivo (en vez de inline en cada modelo) porque
// vamos a tipar muchas funciones con `Point` en etapas posteriores
// (movimiento, snapping a grid, conectores entre objetos). Tenerlo central
// permite cambiar la representación una sola vez si decidimos, por ejemplo,
// añadir un eje Z para z-index o si pasamos a coordenadas en porcentajes.

export interface Point {
  x: number;
  y: number;
}
