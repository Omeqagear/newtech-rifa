import React from 'react';

interface Props {
  background: string;
  handleBackgroundChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  clearBackground: () => void;
}

const BackgroundControls: React.FC<Props> = ({
  background,
  handleBackgroundChange,
  fileInputRef,
  clearBackground,
}) => (
  <div className="background-controls">
    <h3>🎨 Fondo</h3>
    <input
      type="file"
      accept="image/*"
      onChange={handleBackgroundChange}
      ref={fileInputRef}
    />
    <button onClick={() => fileInputRef.current?.click()}>Cargar Imagen</button>
    {background && (
      <button onClick={clearBackground} style={{ background: '#fbeee0', color: '#e67e22' }}>
        Quitar Fondo
      </button>
    )}
  </div>
);

export default BackgroundControls;