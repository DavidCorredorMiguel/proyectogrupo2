import React, { useState } from 'react';
import { mockQuestions } from '../mocks/mockQuestions';

export default function TarjetasAprender() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState({});

  const handleAnswerClick = (questionId, answerIndex) => {
    // Marcar la respuesta seleccionada
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    // Mostrar el resultado
    setShowResults(prev => ({ ...prev, [questionId]: true }));
  };
  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults({});
  };
  const handleResetQuestion = (questionId) => {
    setSelectedAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
    setShowResults(prev => {
      const newResults = { ...prev };
      delete newResults[questionId];
      return newResults;
    });
  };
  const getButtonClass = (questionId, answerIndex, correctIndex) => {
    // Si no se ha mostrado el resultado, botón por defecto
    if (!showResults[questionId]) {
      return "bg-blue-500 hover:bg-blue-600 text-white";
    }
    // Si es la respuesta correcta, verde
    if (answerIndex === correctIndex) {
      return "bg-green-500 text-white";
    }
    // Si fue seleccionada pero no es correcta, rojo
    if (selectedAnswers[questionId] === answerIndex) {
      return "bg-red-500 text-white";
    }
    // Resto en gris
    return "bg-gray-300 text-gray-700";
  };
  const calculateScore = () => {
    return Object.keys(selectedAnswers).filter(
      qId => selectedAnswers[qId] === mockQuestions.find(q => q.id === parseInt(qId)).respuestaCorrecta
    ).length;
  };
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-fondo)', padding: '2rem'}}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'var(--color-fondo-secundario)',
          border: '1px solid var(--color-borde)', borderRadius: '1rem',
          padding: '2rem', marginBottom: '1.5rem', boxShadow: 'var(--sombra)'}}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center',
            color: 'var(--color-primario)', marginBottom: '0.5rem'}}>
            Quiz de Productos
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--color-texto-secundario)',
            marginBottom: '1.5rem'}}>
            Selecciona la respuesta correcta para cada pregunta
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <button onClick={handleReset}
              style={{ backgroundColor: 'var(--color-primario)', color: 'white',
                fontWeight: '600', padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
                boxShadow: 'var(--sombra)', transition: 'all 0.2s ease' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primario-hover)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primario)'}>
              🔄 Reiniciar Quiz
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {mockQuestions.map((question) => (
            <div
              key={question.id}
              style={{ backgroundColor: 'var(--color-fondo-secundario)',
                border: '1px solid var(--color-borde)', borderRadius: '0.75rem',
                padding: '1.5rem', boxShadow: 'var(--sombra)',
                transition: 'box-shadow 0.3s ease'}}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600',
                marginBottom: '1rem', color: 'var(--color-texto)',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center' }}>
                <span>{question.id}. {question.pregunta}</span>
                {showResults[question.id] && (
                  <button onClick={() => handleResetQuestion(question.id)}
                    style={{ backgroundColor: 'var(--color-fondo-terciario)',
                      color: 'var(--color-texto-secundario)',
                      border: '1px solid var(--color-borde)',
                      borderRadius: '0.375rem', padding: '0.375rem 0.75rem',
                      fontSize: '0.875rem', cursor: 'pointer',
                      transition: 'all 0.2s ease' }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-borde)';
                      e.currentTarget.style.color = 'var(--color-texto)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-fondo-terciario)';
                      e.currentTarget.style.color = 'var(--color-texto-secundario)';
                    }}>
                    🔄 Reintentar
                  </button>
                )}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem'}}>
                {question.respuestas.map((respuesta, index) => (
                  <button key={index}
                    onClick={() => handleAnswerClick(question.id, index)}
                    disabled={showResults[question.id]}
                    className={`
                      ${getButtonClass(question.id, index, question.respuestaCorrecta)}
                      px-4 py-3 rounded-lg font-medium transition-all
                      disabled:cursor-not-allowed
                      transform hover:scale-105 active:scale-95`}>
                    {respuesta}
                  </button>
                ))}
              </div>
              {showResults[question.id] && (
                <div style={{ marginTop: '1rem', padding: '0.75rem',
                  backgroundColor: 'var(--color-fondo-terciario)',
                  borderRadius: '0.5rem' }}>
                  <p style={{ fontSize: '0.875rem',
                    color: 'var(--color-texto-secundario)' }}>
                    {selectedAnswers[question.id] === question.respuestaCorrecta
                      ? "✓ ¡Correcto!"
                      : `✗ Incorrecto. Es: ${question.respuestas[question.respuestaCorrecta]}`
                    }
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        {Object.keys(showResults).length === mockQuestions.length && (
          <div style={{ backgroundColor: 'var(--color-fondo-secundario)',
            border: '1px solid var(--color-borde)', borderRadius: '1rem',
            padding: '2rem', marginTop: '2rem', textAlign: 'center',
            boxShadow: 'var(--sombra-elevada)' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold',
              color: 'var(--color-primario)', marginBottom: '1rem' }}>
              ¡Test Completado! 🎉
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-texto)',
              marginBottom: '0.5rem' }}>
              Puntuación: <span style={{ fontWeight: 'bold', color: 'var(--color-primario)' }}>
                {calculateScore()}</span> / {mockQuestions.length}
            </p>
            <p style={{ color: 'var(--color-texto-secundario)' }}>
              {calculateScore() === mockQuestions.length ? "¡Perfecto! 🌟"
                : calculateScore() >= mockQuestions.length * 0.7
                  ? "¡Muy bien! 👏" : "Sigue practicando 💪"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}