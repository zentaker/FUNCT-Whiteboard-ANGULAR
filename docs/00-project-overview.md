# 00 — Project Overview

## Qué es

**Angular Whiteboard Lab** es un whiteboard interactivo educativo, inspirado
en Miro y FigJam. **No** es un clon: es un laboratorio donde cada decisión
del código existe para ser leída, entendida y modificada por una persona
aprendiendo Angular.

La consigna mental al escribir código aquí es:

> *"¿Si alguien abre este archivo por primera vez, va a entender qué hace
> y por qué existe?"*

Si la respuesta es no, el código no está terminado. No importa si funciona.

## Qué enseña

- Standalone components y composición moderna en Angular 17+.
- Reactividad con **signals** y **computed** (sin RxJS para estado local).
- Separación clara entre **modelo de dominio**, **persistencia**, **estado**
  y **componentes visuales**.
- Inyección de dependencias por **interfaces abstractas** (`BoardRepository`)
  para hacer la persistencia reemplazable.
- Patrón **dispatcher** para renderizar objetos heterogéneos.
- Uso pragmático de **Bootstrap** para el sistema de diseño + CSS plano
  solo para lo que Bootstrap no cubre.

## Qué NO hace todavía

Esta es la **Etapa 2** del roadmap (Layout + Render). Las interacciones
todavía no existen:

- ❌ No puedes arrastrar objetos.
- ❌ No puedes seleccionar, redimensionar ni eliminar objetos.
- ❌ No puedes crear objetos nuevos desde el toolbar (los botones cambian
  la herramienta activa, pero el canvas aún no responde a la creación).
- ❌ No hay conectores entre objetos.
- ❌ No hay pan/zoom del canvas.
- ❌ No hay export/import a JSON.

Cada una de esas faltantes está mapeada a una etapa del
[roadmap](07-stage-roadmap.md).

## Por qué Bootstrap

Porque el sistema visual ya está resuelto. Cards, botones, navbars,
espaciados, colores básicos, utilidades flex — todo viene gratis con
Bootstrap. Inventar un sistema propio desde cero distraería del objetivo
real: aprender Angular.

## Por qué CSS plano

Porque cada capa de abstracción (SCSS, Tailwind, Material, CDK) es una
capa más que el estudiante tiene que aprender antes de poder leer el
proyecto. En esta etapa queremos que **HTML → clase → estilo** sea lineal
y directo. CSS plano + Bootstrap cumple eso.
