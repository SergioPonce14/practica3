import { useState, useEffect } from "react";

export function useLocalStorage<T>(clave: string, valorInicial: T) {
    // 1. Estado inicial perezoso: lee de localStorage solo al montar
    const [valor, setValor] = useState<T>(() => {
        try {
            const guardado = localStorage.getItem(clave);
            return guardado ? (JSON.parse(guardado) as T) : valorInicial;
        } catch {
            return valorInicial;
        }
    });

    // 2. Efecto justificado: sincroniza el estado con un sistema externo (localStorage)
    useEffect(() => {
        try {
            localStorage.setItem(clave, JSON.stringify(valor));
        } catch {
            // Ignorar si el almacenamiento está bloqueado
        }
    }, [clave, valor]);

    return [valor, setValor] as const;
}