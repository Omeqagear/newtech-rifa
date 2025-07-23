import React from 'react';

interface Props {
  theme: "newtech" | "summer" | "christmas" | "halloween";
  setTheme: React.Dispatch<React.SetStateAction<"newtech" | "summer" | "christmas" | "halloween">>;
  useCustomTheme: boolean;
  setUseCustomTheme: (v: boolean) => void;
  customColors: string[];
  setCustomColors: (colors: string[]) => void;
}

const ThemeControls: React.FC<Props> = ({
  theme, setTheme, useCustomTheme, setUseCustomTheme, customColors, setCustomColors
}) => (
  <div className="theme-controls">
    <h3>🎨 Paleta de Colores</h3>
    <select value={theme} onChange={(e) => setTheme(e.target.value as "newtech" | "summer" | "christmas" | "halloween")} disabled={useCustomTheme}>
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
          />
        ))}
      </div>
    )}
  </div>
);

export default ThemeControls;