import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

import { useLocalStorage } from './hooks/useLocalStorage';

import BackgroundControls from './components/BackgroundControls';
import ThemeControls from './components/ThemeControls';
import HistoryControls from './components/HistoryControls';
import WinnersHistory from './components/WinnersHistory';
import ParticipantForm from './components/ParticipantForm';
import ParticipantsList from './components/ParticipantsList';
import WheelSection from './components/WheelSection';
import WinnerModal from './components/WinnerModal';

interface Participant {
  name: string;
  number: string;
}

interface WinnerRecord {
  name: string;
  number: string;
  timestamp: string;
}

const themes = {
  newtech: ['#00aeef', '#00a651', '#ffffff'],
  summer: ['#FFD700', '#FF6F61', '#40E0D0', '#32CD32'],
  christmas: ['#D42426', '#006A4E', '#FFD700', '#FFFFFF'],
  halloween: ['#FF8C00', '#000000', '#8A2BE2', '#39FF14'],
};

type ThemeName = keyof typeof themes;

const App: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [winner, setWinner] = useState<Participant | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [background, setBackground] = useState<string>('');
  const [theme, setTheme] = useState<ThemeName>('newtech');
  const [customColors, setCustomColors] = useState<string[]>(['#ff0000', '#00ff00', '#0000ff']);
  const [useCustomTheme, setUseCustomTheme] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [winnersHistory, setWinnersHistory] = useLocalStorage<WinnerRecord[]>('rifa_winners', []);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const wheelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveWinnerToHistory = (winner: Participant) => {
    const now = new Date();
    const record: WinnerRecord = {
      name: winner.name,
      number: winner.number,
      timestamp: now.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    const updated = [record, ...winnersHistory];
    setWinnersHistory(updated);
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBackground(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const isDuplicate = (name: string, number: string): boolean => {
    return participants.some(
      (p) =>
        p.name.trim().toLowerCase() === name.trim().toLowerCase() ||
        p.number.trim().toLowerCase() === number.trim().toLowerCase()
    );
  };

  const handleBulkAdd = (bulk: { name: string; number: string }[]) => {
  let added = 0;
  const newParticipants = [...participants];
  bulk.forEach(({ name, number }) => {
    if (
      name.trim() &&
      number.trim() &&
      !isDuplicate(name, number) &&
      !newParticipants.some(
        (p) =>
          p.name.trim().toLowerCase() === name.trim().toLowerCase() ||
          p.number.trim().toLowerCase() === number.trim().toLowerCase()
      )
    ) {
      newParticipants.push({ name: name.trim(), number: number.trim() });
      added++;
    }
  });
  setParticipants(newParticipants);
  if (added === 0) {
    alert('No se agregaron participantes nuevos. Todos ya existen o los datos son inválidos.');
  } else {
    alert(`Se agregaron ${added} participantes nuevos.`);
  }
};

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedNumber = number.trim();

    if (!trimmedName || !trimmedNumber) return;

    if (isDuplicate(trimmedName, trimmedNumber)) {
      alert('Error: El nombre o número ya existe.');
      return;
    }

    setParticipants([...participants, { name: trimmedName, number: trimmedNumber }]);
    setName('');
    setNumber('');
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
    if (winner) setWinner(null);
  };

  const spinWheel = () => {
    if (participants.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    const spinTime = 4000;
    const spinAngle = 3600 + Math.floor(Math.random() * 360);
    const newRotation = rotation + spinAngle;
    setRotation(newRotation);

    if (wheelRef.current) {
      wheelRef.current.style.transition = `transform ${spinTime}ms cubic-bezier(0, 0.9, 0.57, 1)`;
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
    }

    setTimeout(() => {
      const winnerIndex = Math.floor(Math.random() * participants.length);
      const selectedWinner = participants[winnerIndex];
      setWinner(selectedWinner);
      setIsSpinning(false);

      launchConfetti();
      saveWinnerToHistory(selectedWinner);
      setParticipants(participants.filter((_, i) => i !== winnerIndex));
    }, spinTime);
  };

  const handleTransitionEnd = () => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'none';
    }
  };

  const closeModal = () => {
    setWinner(null);
  };

  const resetParticipants = () => {
    if (window.confirm('¿Estás seguro de reiniciar la lista de participantes?')) {
      setParticipants([]);
      setWinner(null);
    }
  };

  const clearBackground = () => {
    setBackground('');
  };

  const clearHistory = () => {
    if (window.confirm('¿Estás seguro de borrar todo el historial de ganadores?')) {
      setWinnersHistory([]);
      alert('Historial de ganadores borrado.');
      setShowHistory(false);
    }
  };

  // Function to launch confetti
  const launchConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#a864fd', '#29d8d5', '#ef007d', '#ffcc00', '#d40000'];

    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 6,
        spread: 60,
        startVelocity: 50,
        origin: { x: Math.random(), y: 0.1 },
        colors: colors,
        zIndex: 9997,
      });
      requestAnimationFrame(frame);
    };
    frame();
  };

  const getTextColor = (bgColor: string): string => {
    const el = document.createElement('div');
    el.style.background = bgColor;
    document.body.appendChild(el);
    const computed = getComputedStyle(el).backgroundColor;
    document.body.removeChild(el);

    const rgb = computed.match(/\d+/g)?.map(Number) || [0, 0, 0];
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  const exportToCSV = () => {
    const headers = ['Nombre', 'Codigo de Empleado', 'Fecha y Hora'];
    const rows = winnersHistory.map((record) => [
      record.name,
      `${record.number}`,
      record.timestamp,
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `historial_ganadores_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app" style={{ backgroundImage: background ? `url(${background})` : undefined }}>
      <h1>🎯 Rifa de Empleados</h1>
      {/* Hamburger menu */}
      <div className="menu-container">
        <button
          className="menu-toggle"
          aria-label="Abrir menú de controles"
          onClick={() => setShowMenu(!showMenu)}
        >
          {/* Simple hamburger icon */}
          <span style={{ fontSize: 28 }}>☰</span>
        </button>
        {showMenu && (
          <div className="menu-panel">
            <BackgroundControls
              background={background}
              handleBackgroundChange={handleBackgroundChange}
              fileInputRef={fileInputRef}
              clearBackground={clearBackground}
            />
            <ThemeControls
              theme={theme}
              setTheme={setTheme}
              useCustomTheme={useCustomTheme}
              setUseCustomTheme={setUseCustomTheme}
              customColors={customColors}
              setCustomColors={setCustomColors}
            />
            <HistoryControls
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              winnersHistory={winnersHistory}
              clearHistory={clearHistory}
              exportToCSV={exportToCSV}
            />
          </div>
        )}
      </div>
      {showHistory && (
        <WinnersHistory winnersHistory={winnersHistory} />
      )}
      <div className="main-layout">
        <aside className="sidebar">
          <ParticipantForm
            name={name}
            setName={setName}
            number={number}
            setNumber={setNumber}
            handleAddParticipant={handleAddParticipant}
            isSpinning={isSpinning}
            handleBulkAdd={handleBulkAdd}
          />
          <ParticipantsList
            participants={participants}
            handleRemoveParticipant={handleRemoveParticipant}
            resetParticipants={resetParticipants}
            isSpinning={isSpinning}
          />
        </aside>
        <WheelSection
          participants={participants}
          colors={useCustomTheme ? customColors : themes[theme]}
          wheelRef={wheelRef}
          handleTransitionEnd={handleTransitionEnd}
          getTextColor={getTextColor}
          spinWheel={spinWheel}
          isSpinning={isSpinning}
        />
      </div>
      {winner && (
        <WinnerModal winner={winner} closeModal={closeModal} />
      )}
    </div>
  );
};

export default App;