import TarjetaEquipo from "./TarjetaEquipo";
import type { Equipo } from "../tipos";

interface PropsListaEquipos {
    equipos: Equipo[];
    totalOriginales: number;
    favoritosIds: Set<string>;
    onSeleccionarEquipo: (equipo: Equipo) => void;
    onAlternarFavorito: (idEquipo: string) => void;
}

export default function ListaEquipos({
    equipos,
    totalOriginales,
    favoritosIds,
    onSeleccionarEquipo,
    onAlternarFavorito
}: PropsListaEquipos) {
    if (equipos.length === 0) {
        return (
            <div className="estado-vacio">
                <p>
                    {totalOriginales === 0
                        ? "📭 La API no devolvió ningún equipo en este momento."
                        : "🔍 Ningún equipo coincide con los filtros de búsqueda actuales."}
                </p>
            </div>
        );
    }

    return (
        <section className="grid-equipos">
            {equipos.map((eq) => (
                <TarjetaEquipo
                    key={eq.id}
                    equipo={eq}
                    esFavorito={favoritosIds.has(eq.id)}
                    onSeleccionar={onSeleccionarEquipo}
                    onAlternarFavorito={onAlternarFavorito}
                />
            ))}
        </section>
    );
}