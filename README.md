# Atlas de La Liga · M3 Reactor Core

Misión M3 · Reactor Core — Web Development I.

## Cómo probarlo

Explora los clubes busca en tiempo real, ordena con filtros, marca tus favoritos  y haz clic en una tarjeta para ver la historia completa. 

## Uso de IA
Usé Gemini como pareja de programación. Ejemplo de prompt real: "Cómo hago con .refine() en Zod para restringir el dorsal si la posición es Portero y que el error salga en el campo dorsal?". Verifiqué cada paso arrancando el servidor (`npm run dev` y `json-server`), comprobando el ciclo `POST` y  `GET` en la pestaña Network y revisando la consola del navegador para ver los avisos de `safeParse`. Gran parte del CSS se apoyó en la IA

## Autopsia

1. En `src/services/jugadores.ts` decidí validar cada jugador recibido del servidor con `safeParse` dentro de un bucle. Descarté la alternativa de usar `z.array(esquemaJugadorApi).parse()` sobre toda la lista porque un solo registro corrupto en `db.json` tumbaría toda la consulta impidiendo mostrar los jugadores válidos.
2. En `FormularioJugador.tsx` decidí llamar a `reset()` y a `invalidateQueries({ queryKey: ["jugadores"] })` dentro del `onSuccess` de `useMutation`. Descarté hacerlo justo después de `mutacion.mutate(datos)` porque, al ser una petición asíncrona, si el servidor fallase se limpiarían los campos y el usuario perdería lo que había escrito.
