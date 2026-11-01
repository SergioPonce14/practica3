import { useEffect } from "react";
import type { Equipo } from "../tipos";

interface PropsModalDetalle {
    equipo: Equipo | null;
    onCerrar: () => void;
}

export default function ModalDetalle({ equipo, onCerrar }: PropsModalDetalle) {
    
    // Escuchamos la tecla Escape solo cuando el modal está abierto
    useEffect(() => {
        if (!equipo) return; // Si no hay modal abierto, no hacemos nada

        function manejarTeclaEscape(evento: KeyboardEvent) {
            if (evento.key === "Escape") {
                onCerrar();
            }
        }

        window.addEventListener("keydown", manejarTeclaEscape);

        // quitamos el event listener cuando se cierra el modal
        return () => {
            window.removeEventListener("keydown", manejarTeclaEscape);
        };
    }, [equipo, onCerrar]); 

    // si el estado es null, no devolvemos HTML
    if (!equipo) return null;

    const textoFundacion = equipo.fundacion !== undefined ? String(equipo.fundacion) : "Año desconocido";

    return (
        // Al clicar en el fondo oscuro se cierra el modal
        <div className="modal" onClick={onCerrar}>
            {/* Detenemos la propagación para que al clicar en la caja blanca NO se cierre */}
            <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                <button id="btnCerrarModal" className="btn-cerrar" type="button" onClick={onCerrar}>
                    ✖ Cerrar
                </button>
                
                <div className="detalle-modal">
                    <img
                        src={equipo.escudo}
                        alt={`Escudo de ${equipo.nombre}`}
                        className="escudo-grande"
                    />
                    <h2>{equipo.nombre}</h2>
                    
                    <hr />
                    
                    <p>📍 Ciudad: {equipo.ciudad} ({textoFundacion})</p>
                    <p>🏟 Estadio: {equipo.estadio}</p>
                    <p className="descripcion">{equipo.descripcion}</p>

                    {equipo.camiseta && (
                        <img
                            src={equipo.camiseta}
                            alt={`Equipación de ${equipo.nombre}`}
                            className="equipacion-modal"
                        />
                    )}

                    {equipo.web && (
                        <p>
                            <a href={equipo.web} target="_blank" rel="noopener noreferrer">
                                Visitar sitio web oficial ↗
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}