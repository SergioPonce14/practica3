import type { EstadisticasLiga } from "../tipos";

interface PropsPanelEstadisticas {
    stats: EstadisticasLiga;
}

export default function PanelEstadisticas({ stats }: PropsPanelEstadisticas) {
    return (
        <section className="panel-estadisticas">
            <div className="stat-box">
                <span>Equipos mostrados: </span>
                <strong>{stats.totalEquipos}</strong>
            </div>

            <div className="stat-box">
                <span>Ciudades diferentes: </span>
                <strong>{stats.totalCiudades}</strong>
            </div>
        </section>
    );
}