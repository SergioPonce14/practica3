# Atlas de La Liga · M3 Reactor Core

Misión M3 · Reactor Core — Web Development I.

## Cómo probarlo

Explora los clubes busca en tiempo real, ordena con filtros, marca tus favoritos  y haz clic en una tarjeta para ver la historia completa. 

## Uso de IA
Usé Gemini como pareja de programación Ejemplo de prompt real: "Como adapto el uso de localStorage a un hook", verifiqué cada paso  arrancando el servidor  (`npm run dev`) y comprobando la consola del navegador y la de Vite en busca de errores.  gran parte del css se construyó utilizando IA

## Autopsia

1. Decidí extraer la lógica de guardado y lectura de favoritos a un hook personalizado . Descarté la alternativa de manejar el `localStorage` directamente dentro de un `useEffect` en `App.tsx`
2. En `App.tsx`, las listas `equiposFiltrados` y `equiposOrdenados`, y el calculo de `estadisticas`, se guardan directamente en cada render a partir de  variables de estado. Descarté guardar la lista filtrada u ordenada en un nuevo `useState` y actualizarla mediante un `useEffect` , reduciendo así la complejidad, evitando renders  y garantizando que los datos siempre estén sincronizados con la interfaz
