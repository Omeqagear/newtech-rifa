import React from 'react';

interface Props {
  theme: string;
  setTheme: (theme: string) => void;
  useCustomTheme: boolean;
  setUseCustomTheme: (v: boolean) => void;
  customColors: string[];
  setCustomColors: (colors: string[]) => void;
}

const ThemeControls: React.FC<Props> = ({
  theme,
  setTheme,
  useCustomTheme,
  setUseCustomTheme,
  customColors,
  setCustomColors,
}) => (
  <div className="theme-controls">
    <h3>🎨 Paleta de Colores</h3>
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      disabled={useCustomTheme}
    >
      <option value="newtech">Newtech Oficial</option>
      <option value="summer">Verano</option>
      <option value="christmas">Navidad</option>
      <option value="halloween">Halloween</option>
    </select>
    <label>
      <input
        type="checkbox"
        checked={useCustomTheme}
        onChange={(e) => setUseCustomTheme(e.target.checked)}
        style={{ marginRight: 6 }}
      />
      Paleta personalizada
    </label>
    {useCustomTheme && (
      <div className="custom-colors">
        {customColors.map((color, i) => (
          <input
            key={i}
            type="color"
            value={color}
            onChange={(e) => {
              const newColors = [...customColors];
              newColors[i] = e.target.value;
              setCustomColors(newColors);
            }}
            style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer' }}
          />
        ))}
      </div>
    )}
  </div>
);

export default ThemeControls;