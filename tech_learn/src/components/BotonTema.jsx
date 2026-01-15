import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTema } from "../mocks/useTema"; 

function BotonTema() {
  const { alternarTema, esOscuro } = useTema();

  return (
    <button className="boton-tema" onClick={alternarTema}>
      {esOscuro ? (
        <>
          <FontAwesomeIcon icon={faSun} />
          <span>Modo claro</span>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faMoon} />
          <span>Modo oscuro</span>
        </>
      )}
    </button>
  );
}

export default BotonTema;
