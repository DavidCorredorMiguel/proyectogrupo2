import { useContext } from 'react';
import { TemaContext } from '../contextos/TemaContext';

export function useTema() {
  const contexto = useContext(TemaContext);

  if (!contexto) {
    throw new Error('useTema debe usarse dentro de un TemaProvider');
  }

  return contexto;
}
