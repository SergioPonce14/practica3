import { useState, useEffect } from "react";
import { obtenerEquiposLaLiga } from "./api";
import { filtrarEquipos, ordenarEquipos, calcularEstadisticas } from "./logica";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Equipo, CriterioOrden } from "./tipos";

export default function App() {
    //Estados de la petición asíncrona
    const [equipos, setEquipos] = useState<Equipo[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Estados de filtros, orden y modal
    const [busqueda, setBusqueda] = useState<string>("");
    const [criterioOrden, setCriterioOrden] = useState<CriterioOrden>("nombre");
    const [soloFavoritos, setSoloFavoritos] = useState<boolean>(false);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(null);

    // Estado persistente 
    const [favoritos, setFavoritos] = useLocalStorage<string[]>("favoritos_laliga_ids", []);

    // cargar o recargar equipos desde la API
    async function cargarDatos(forzarRecarga: boolean = false) {
        setCargando(true);
        setError(null);
        try {
            const datos = await obtenerEquiposLaLiga(forzarRecarga);
            setEquipos(datos);
        } catch (err) {
            const mensaje = err instanceof Error ? err.message : "Error desconocido al cargar los equipos.";
            setError(mensaje);
        } finally {
            setCargando(false);
        }
    }

    //  Cargar equipos al montar el componente 
    useEffect(() => {
        let ignorar = false;

        async function iniciar() {
            setCargando(true);
            setError(null);
            try {
                const datos = await obtenerEquiposLaLiga(false);
                if (!ignorar) {
                    setEquipos(datos);
                }
            } catch (err) {
                if (!ignorar) {
                    const mensaje = err instanceof Error ? err.message : "Error al cargar los equipos.";
                    setError(mensaje);
                }
            } finally {
                if (!ignorar) {
                    setCargando(false);
                }
            }
        }

        iniciar();

        // Función de limpieza 
        return () => {
            ignorar = true;
        };
    }, []);

    //calculados durante el render
    const favoritosSet = new Set(favoritos);
    const equiposFiltrados = filtrarEquipos(equipos, busqueda, soloFavoritos, favoritosSet);
    const equiposOrdenados = ordenarEquipos(equiposFiltrados, criterioOrden);
    const estadisticas = calcularEstadisticas(equiposOrdenados);

    //  Sincronizar el título de la pestaña del navegador 
    useEffect(() => {
        document.title = `(${estadisticas.totalEquipos}) Atlas de La Liga`;
    }, [estadisticas.totalEquipos]);

    // añadir o quitar favoritos
function manejarAlternarFavorito(idEquipo: string) {
        if (favoritos.includes(idEquipo)) {
            setFavoritos(favoritos.filter((id) => id !== idEquipo));
        } else {
            
            setFavoritos([...favoritos, idEquipo]);
        }
    }

    return (
        <>
            <header>
                <h1>⚽ Atlas de La Liga</h1>
                <p>Explora los clubes de Primera División, marca tus favoritos y consulta su historia</p>
            </header>

            <main className="contenedor-principal">
                
                {cargando && (
                    <div className="estado-carga">
                        <p>⏳ Cargando equipos de La Liga...</p>
                    </div>
                )}

                {!cargando && error && (
                    <div className="estado-error">
                        <p>⚠ {error}</p>
                        <button type="button" onClick={() => cargarDatos(true)}>
                            Reintentar
                        </button>
                    </div>
                )}

                {!cargando && !error && (
                    <p>
                        ✅ Datos listos: <strong>{estadisticas.totalEquipos}</strong> equipos en{" "}
                        <strong>{estadisticas.totalCiudades}</strong> ciudades. (Favoritos:{" "}
                        {favoritos.length})
                    </p>
                )}
            </main>
        </>
    );
}