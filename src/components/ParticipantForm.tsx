import React from 'react';

interface Props {
  name: string;
  setName: (v: string) => void;
  number: string;
  setNumber: (v: string) => void;
  handleAddParticipant: (e: React.FormEvent) => void;
  isSpinning: boolean;
}

const ParticipantForm: React.FC<Props> = ({
  name, setName, number, setNumber, handleAddParticipant, isSpinning
}) => (
  <div className="form-container">
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
        placeholder="Número de empleado"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button type="submit" disabled={isSpinning}>
        Agregar
      </button>
    </form>
  </div>
);

export default ParticipantForm;