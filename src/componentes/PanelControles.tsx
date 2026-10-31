import type { CriterioOrden } from "../tipos";

interface PropsPanelControles {
    busqueda: string;
    onCambiarBusqueda: (nuevoTexto: string) => void;
    criterioOrden: CriterioOrden;
    onCambiarOrden: (nuevoCriterio: CriterioOrden) => void;
    soloFavoritos: boolean;
    onCambiarFavoritos: (marcado: boolean) => void;
    onRecargar: () => void;
    cargando: boolean;
}

export default function PanelControles({
    busqueda,
    onCambiarBusqueda,
    criterioOrden,
    onCambiarOrden,
    soloFavoritos,
    onCambiarFavoritos,
    onRecargar,
    cargando
}: PropsPanelControles) {
    return (
        <section className="panel-controles">
            <input
                type="text"
                placeholder="Buscar por equipo, ciudad o estadio..."
                value={busqueda}
                onChange={(e) => onCambiarBusqueda(e.target.value)}
            />

            <select
                value={criterioOrden}
                onChange={(e) => onCambiarOrden(e.target.value as CriterioOrden)}
            >
                <option value="nombre">Ordenar por nombre (A-Z)</option>
                <option value="fundacion">Más antiguos primero</option>
            </select>

            <label className="filtro-favoritos">
                <input
                    type="checkbox"
                    checked={soloFavoritos}
                    onChange={(e) => onCambiarFavoritos(e.target.checked)}
                />
                <span>⭐ Solo favoritos</span>
            </label>

            <button type="button" onClick={onRecargar} disabled={cargando}>
                🔄 Limpiar caché y recargar
            </button>
        </section>
    );
}