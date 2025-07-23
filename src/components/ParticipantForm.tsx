import React, { useRef, useState } from 'react';

interface Props {
  name: string;
  setName: (v: string) => void;
  number: string;
  setNumber: (v: string) => void;
  handleAddParticipant: (e: React.FormEvent) => void;
  isSpinning: boolean;
  handleBulkAdd: (participants: { name: string; number: string }[]) => void;
}

const ParticipantForm: React.FC<Props> = ({
  name,
  setName,
  number,
  setNumber,
  handleAddParticipant,
  isSpinning,
  handleBulkAdd,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) return;
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const nameIdx = headers.findIndex(h => h.includes('nombre'));
      const codeIdx = headers.findIndex(h => h.includes('codigo'));
      if (nameIdx === -1 || codeIdx === -1) {
        alert('El archivo debe tener los encabezados: Nombre de empleado, Codigo de empleado');
        return;
      }
      const participants = lines.slice(1).map(line => {
        const cols = line.split(',');
        // Elimina comillas dobles o simples alrededor del nombre y código
        const clean = (str: string) => str.replace(/^["']|["']$/g, '').trim();
        return {
          name: clean(cols[nameIdx] || ''),
          number: clean(cols[codeIdx] || ''),
        };
      }).filter(p => p.name && p.number);
      handleBulkAdd(participants);
    };
    reader.readAsText(file, 'utf-8');
    // Limpia el input para permitir subir el mismo archivo de nuevo si es necesario
    e.target.value = '';
  };

  return (
    <div className="form-container collapsible-container">
      <button
        className="collapsible-toggle"
        type="button"
        aria-expanded={!collapsed}
        onClick={() => setCollapsed((c) => !c)}
      >
        {collapsed ? '➕ Mostrar formulario' : '➖ Ocultar formulario'}
      </button>
      {!collapsed && (
        <>
          <h3>Agregar Participante</h3>
          <form onSubmit={handleAddParticipant}>
            <input
              type="text"
              placeholder="Nombre del empleado"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Código de empleado"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <button type="submit" disabled={isSpinning}>
              Agregar
            </button>
          </form>
          <label className="csv-upload-label">
            <strong>Agregar desde CSV:</strong>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              className="csv-upload-input"
              onChange={handleCSVUpload}
              disabled={isSpinning}
            />
            <span className="csv-upload-help">
              El archivo debe tener los encabezados:<br />
              <code>Nombre de empleado, Codigo de empleado</code>
            </span>
          </label>
        </>
      )}
    </div>
  );
};

export default ParticipantForm;