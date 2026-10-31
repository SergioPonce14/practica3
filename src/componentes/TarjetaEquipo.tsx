import type { Equipo } from "../tipos";

interface PropsTarjetaEquipo {
    equipo: Equipo;
    esFavorito: boolean;
    onSeleccionar: (equipo: Equipo) => void;
    onAlternarFavorito: (idEquipo: string) => void;
}

export default function TarjetaEquipo({
    equipo,
    esFavorito,
    onSeleccionar,
    onAlternarFavorito
}: PropsTarjetaEquipo) {
    const resumen =
        equipo.descripcion.length > 70
            ? equipo.descripcion.substring(0, 70) + "..."
            : equipo.descripcion;

    return (
        <article
            className="tarjeta-equipo"
            style={{ borderTopColor: equipo.color }}
            onClick={() => onSeleccionar(equipo)}
        >
            <div className="cabecera-tarjeta">
                <img
                    src={equipo.escudo || "https://via.placeholder.com/50?text=Escudo"}
                    alt={`Escudo de ${equipo.nombre}`}
                    loading="lazy"
                />

                <div className="titulo-tarjeta">
                    <h3>{equipo.nombre}</h3>
                    <span className="ciudad">{equipo.ciudad}</span>
                </div>

                <button
                    type="button"
                    className="btn-favorito"
                    title={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
                    onClick={(e) => {
                        e.stopPropagation();
                        onAlternarFavorito(equipo.id);
                    }}
                >
                    {esFavorito ? "⭐" : "☆"}
                </button>
            </div>

            <div className="cuerpo-tarjeta">
                <p>🏟 Estadio: {equipo.estadio}</p>
                <p>
                    🏛 Fundación:{" "}
                    {equipo.fundacion !== undefined ? equipo.fundacion : "Desconocida"}
                </p>
                <p style={{ fontSize: "0.85rem", color: "#666", fontStyle: "italic", marginTop: "8px" }}>
                    📝 {resumen}
                </p>

                {(equipo.web || equipo.camiseta) && (
                    <div className="extras-tarjeta">
                        {equipo.web && (
                            <a
                                href={equipo.web}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="enlace-web"
                                onClick={(e) => e.stopPropagation()}
                            >
                                🌐 Web Oficial ↗
                            </a>
                        )}

                        {equipo.camiseta && (
                            <img
                                src={equipo.camiseta}
                                alt={`Equipación de ${equipo.nombre}`}
                                className="mini-camiseta"
                                loading="lazy"
                            />
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}