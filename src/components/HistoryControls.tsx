import React from 'react';

interface Props {
  showHistory: boolean;
  setShowHistory: (v: boolean) => void;
  winnersHistory: any[];
  clearHistory: () => void;
  exportToCSV: () => void;
}

const HistoryControls: React.FC<Props> = ({
  showHistory, setShowHistory, winnersHistory, clearHistory, exportToCSV
}) => (
  <div className="history-controls">
    <h3>📋 Registro de Ganadores</h3>
    <button onClick={() => setShowHistory(!showHistory)}>
      {showHistory ? 'Ocultar Historial' : 'Ver Historial'}
    </button>
    {winnersHistory.length > 0 && (
      <>
        <button onClick={clearHistory} style={{ background: '#e74c3c', color: 'white' }}>
          Borrar Historial
        </button>
        <div className="export-buttons">
          <button onClick={exportToCSV}>Exportar a CSV</button>
        </div>
      </>
    )}
  </div>
);

export default HistoryControls;