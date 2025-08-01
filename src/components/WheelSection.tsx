import React, { useState } from 'react';

interface Participant {
  name: string;
  number: string;
}

interface Props {
  participants: Participant[];
  colors: string[];
  wheelRef: React.RefObject<HTMLDivElement | null>;
  handleTransitionEnd: () => void;
  getTextColor: (bgColor: string) => string;
  spinWheel: () => void;
  isSpinning: boolean;
}

const LOGOS = [
  { label: 'Logo Newtech', value: '/logo-newtech.png' },
  { label: 'Logo Global', value: '/newtech_global_logo.png' },
];

const WheelSection: React.FC<Props> = ({
  participants, colors, wheelRef, handleTransitionEnd, getTextColor, spinWheel, isSpinning
}) => {
  const [centerLogo, setCenterLogo] = useState(LOGOS[1].value);

  return (
    <main className="wheel-section">
      {participants.length > 0 ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <label className="logo-selector-label">
              Logo central:
              <select
                value={centerLogo}
                onChange={e => setCenterLogo(e.target.value)}
                className="logo-selector-select"
              >
                {LOGOS.map(logo => (
                  <option key={logo.value} value={logo.value}>{logo.label}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="wheel-container">
            <div
              className="wheel"
              ref={wheelRef}
              onTransitionEnd={handleTransitionEnd}
            >
              {participants.map((p, index) => {
                const sliceAngle = 360 / participants.length;
                const rotateSegment = index * sliceAngle;
                // Para transversal: el texto debe estar a 90 grados respecto al radio
                const textRotate = -rotateSegment - sliceAngle / 1.3 + 90;
                const color = colors[index % colors.length];
                return (
                  <div
                    key={index}
                    className="wheel-segment"
                    style={{
                      transform: `rotate(${rotateSegment}deg)`,
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                      backgroundColor: color,
                    }}
                  >
                    <span
                      style={{
                        transform: `rotate(${textRotate}deg)`,
                        position: 'absolute',
                        left: '50%',
                        top: '100px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: getTextColor(color),
                        textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.name}
                    </span>
                  </div>
                );
              })}
              <div className="wheel-center">
                <img src={centerLogo} alt="Logo Central" className="center-logo" />
              </div>
            </div>
          </div>
          <button className="spin-button" onClick={spinWheel} disabled={isSpinning}>
            {isSpinning ? 'Girando...' : 'Girar Ruleta'}
          </button>
        </>
      ) : (
        <p className="no-participants-wheel">Agrega participantes para comenzar.</p>
      )}
    </main>
  );
};

export default WheelSection;