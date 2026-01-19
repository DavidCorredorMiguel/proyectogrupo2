import { createContext, useState, useEffect } from "react";
// PASO 1: Crear el contexto y exportarlo (con undefined explícito)
export const TemaContext = createContext(undefined);
// PASO 2: Crear el Provider como componente
export function TemaProvider({ children }) {
  // Inicializar desde localStorage o preferencia del sistema
  const [tema, setTema] = useState(() => {
    const temaGuardado = localStorage.getItem("tema");
    if (temaGuardado) { return temaGuardado; }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "oscuro";
    }
    return "claro";
  });
  // Función para alternar el tema
  const alternarTema =()  => {
    setTema((temaActual) => (temaActual === "claro" ? "oscuro" : "claro"));
  };
  // Función para establecer un tema específico
  const establecerTema = (nuevoTema) => {
    if (nuevoTema === "claro" || nuevoTema === "oscuro") {
      setTema(nuevoTema);
    }
  };
  // Guardar en localStorage y aplicar al documento cuando cambie
  useEffect(() => {
    localStorage.setItem("tema", tema);
    document.documentElement.setAttribute("data-tema", tema);
  }, [tema]);
  // Valor que se comparte con los consumidores
  const valor = {
    tema, alternarTema, establecerTema,
    esOscuro: tema === "oscuro",
    esClaro: tema === "claro",
  };
  return (
  <TemaContext.Provider value={valor}>
    {children}
  </TemaContext.Provider>
  )
}
// Controled by useTema.js