import React from 'react';

interface WinnerRecord {
  name: string;
  number: string;
  timestamp: string;
}

const WinnersHistory: React.FC<{ winnersHistory: WinnerRecord[] }> = ({ winnersHistory }) => (
  <div className="winners-history">
    <h3>🏆 Historial de Ganadores ({winnersHistory.length})</h3>
    {winnersHistory.length === 0 ? (
      <p>No hay ganadores registrados aún.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Codigo de Empleado</th>
            <th>Fecha y Hora</th>
          </tr>
        </thead>
        <tbody>
          {winnersHistory.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.number}</td>
              <td>{record.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default WinnersHistory;