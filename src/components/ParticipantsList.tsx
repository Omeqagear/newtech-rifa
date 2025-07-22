import React from 'react';

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
}) => (
  <>
    {participants.length > 0 && (
      <div className="participants-list">
        <h3>Participantes ({participants.length})</h3>
        <button className="reset-button" onClick={resetParticipants} aria-label="Reiniciar Lista">
          Reiniciar la Lista
        </button>
        <ul>
          {participants.map((p, index) => (
            <li key={`${p.number}-${index}`}>
              {p.name} <span className="number">#{p.number}</span>
              <button onClick={() => handleRemoveParticipant(index)} disabled={isSpinning}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);

export default ParticipantsList;