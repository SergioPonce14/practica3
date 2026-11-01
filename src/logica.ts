import type { Equipo, CriterioOrden, EstadisticasLiga } from "./tipos";

const CLAVE_FAVORITOS = "favoritos_laliga_ids";

export function filtrarEquipos(
    equipos: Equipo[],
    textoBusqueda: string,
    soloFavoritos: boolean,
    favoritosIds: Set<string>
): Equipo[] {
    const texto = textoBusqueda.toLowerCase().trim();

    return equipos.filter((eq) => {
        if (soloFavoritos && !favoritosIds.has(eq.id)) {
            return false;
        }
        if (!texto) return true;

        return (
            eq.nombre.toLowerCase().includes(texto) ||
            eq.ciudad.toLowerCase().includes(texto) ||
            eq.estadio.toLowerCase().includes(texto) 
        );
    });
}

const COMPARADORES: Record<CriterioOrden, (a: Equipo, b: Equipo) => number> = {
    nombre: (a, b) => a.nombre.localeCompare(b.nombre, "es"),
    fundacion: (a, b) => {
        const anioA = a.fundacion ?? Number.MAX_SAFE_INTEGER;// Si no tiene fundación, lo consideramos "más reciente" que cualquier otro
        const anioB = b.fundacion ?? Number.MAX_SAFE_INTEGER;
        return anioA - anioB;
    }
};

export function ordenarEquipos(equipos: Equipo[], criterio: CriterioOrden): Equipo[] {
    const comparador = COMPARADORES[criterio];
    return equipos.toSorted(comparador);
}

export function calcularEstadisticas(equipos: Equipo[]): EstadisticasLiga {
    if (equipos.length === 0) {
        return {
            totalEquipos: 0,
            totalCiudades: 0
        };
    }

    const ciudadesUnicas = new Set(equipos.map((eq) => eq.ciudad));
    const totalCiudades = ciudadesUnicas.size;

    return {
        totalEquipos: equipos.length,
        totalCiudades
    };
}



