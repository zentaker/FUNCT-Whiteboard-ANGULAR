# 05 — Local Mock Persistence

## Qué es `BoardRepository`

Es una **clase abstracta** (no una interface) que define el contrato que
cualquier capa de persistencia debe cumplir:

```ts
abstract class BoardRepository {
  abstract getBoard(id: string): Promise<BoardDocument | null>;
  abstract saveBoard(board: BoardDocument): Promise<void>;
  abstract updateObject(boardId: string, object: BoardObject): Promise<void>;
}
```

### Por qué `abstract class` y no `interface`

Una clase abstracta es un **token de DI válido** en Angular. Esto permite
inyectar `BoardRepository` y dejar que el contenedor de DI sustituya con
la implementación concreta registrada. Una interface no es un token de
DI; obligaría a crear un `InjectionToken` adicional. La diferencia es
solo administrativa, pero la usamos porque es la opción más limpia.

## Qué es `LocalBoardRepository`

Es la implementación concreta de hoy. Mantiene los tableros en un
`Map<string, BoardDocument>` en memoria y lo siembra con
`INITIAL_BOARD_DOCUMENT` en el constructor:

```
LocalBoardRepository
  ├── boards: Map<string, BoardDocument>   ← almacenamiento
  ├── getBoard(id)        → busca en el Map
  ├── saveBoard(board)    → upserta en el Map, refresca updatedAt
  └── updateObject(...)   → reemplaza inmutablemente el objeto target
```

## Por qué NO Firebase / localStorage / IndexedDB todavía

1. **Pedagogía primero.** Queremos que el lector entienda el patrón
   *Repositorio* (separar dominio de persistencia) antes de añadir
   complicaciones como serialización JSON, manejo de errores de red,
   versionado de esquemas o cuotas de almacenamiento.

2. **Reiniciar la app borra el estado, y eso es bueno.** Cada recarga
   vuelve al `INITIAL_BOARD_DOCUMENT`. Para experimentar y aprender, esa
   predictibilidad es valiosa.

3. **No queremos cargar dependencias sin necesidad.** Firebase es ~150 kB
   de bundle, IndexedDB tiene API verbosa, localStorage requiere
   serialización manual. Hoy nada de eso aporta al objetivo.

## Cómo reemplazarla en el futuro

El día que llegue un backend real, los pasos son:

1. Crear `FirebaseBoardRepository extends BoardRepository` (o el nombre
   que corresponda) en `features/board/repositories/`.
2. En `app.config.ts`, registrar el provider:

   ```ts
   { provide: BoardRepository, useClass: FirebaseBoardRepository }
   ```

3. En `BoardStateService`, cambiar
   `inject(LocalBoardRepository)` → `inject(BoardRepository)`.

Eso es todo. Componentes y modelos no se tocan.

## Diagnóstico rápido

¿Algo no se persiste? Recuerda:

- Refrescar la página borra todo (es en memoria).
- No hay efectos secundarios fuera del repositorio; el estado solo cambia
  vía `BoardStateService.updateObject(...)`.
- Si añades un signal o servicio que muta directamente `INITIAL_BOARD_DOCUMENT`,
  estás rompiendo el patrón. Mete el cambio por el repositorio.
