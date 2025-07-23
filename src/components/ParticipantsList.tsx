import React, { useState, useMemo } from 'react';

interface Participant {
  name: string;
  number: string;
}

interface Props {
  participants: Participant[];
  handleRemoveParticipant: (index: number) => void;
  resetParticipants: () => void;
  isSpinning: boolean;
}

const ParticipantsList: React.FC<Props> = ({
  participants, handleRemoveParticipant, resetParticipants, isSpinning
}) => {
  const [search, setSearch] = useState('');

  // Filtrado por nombre o código de empleado
  const filteredParticipants = useMemo(
    () =>
      participants.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.number.toLowerCase().includes(search.toLowerCase())
      ),
    [participants, search]
  );

  return (
    <>
      {participants.length > 0 && (
        <div className="participants-list collapsible-container">
            <>
              <h3>Participantes ({participants.length})</h3>
              <input
                className="participants-search"
                type="text"
                placeholder="Buscar por nombre o código..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoComplete="off"
              />
              <button className="reset-button" onClick={resetParticipants} aria-label="Reiniciar Lista">
                Reiniciar la Lista
              </button>
              <ul>
                {filteredParticipants.map((p, index) => (
                  <li key={`${p.number}-${index}`}>
                    {p.name} <span className="number">{p.number}</span>
                    <button onClick={() => handleRemoveParticipant(participants.indexOf(p))} disabled={isSpinning}>
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
              {filteredParticipants.length === 0 && (
                <div className="participants-empty">No se encontraron participantes.</div>
              )}
            </>
        </div>
      )}
    </>
  );
};

export default ParticipantsList;