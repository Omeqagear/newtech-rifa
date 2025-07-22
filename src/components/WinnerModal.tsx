import React from 'react';

interface Participant {
  name: string;
  number: string;
}

interface Props {
  winner: Participant;
  closeModal: () => void;
}

const WinnerModal: React.FC<Props> = ({ winner, closeModal }) => (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>🎉 ¡Felicidades!</h2>
      <div className="winner-info">
        <p><strong>Empleado:</strong> {winner.name}</p>
        <p><strong>Número:</strong> #{winner.number}</p>
      </div>
      <button className="modal-button" onClick={closeModal}>
        Aceptar
      </button>
    </div>
  </div>
);

export default WinnerModal;