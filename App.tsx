
import React, { useState, useEffect, useCallback } from 'react';
import CookieItem from './components/CookieItem';
import PredictionModal from './components/PredictionModal';
import MusicPlayer from './components/MusicPlayer';
import { generateNewYearPrediction } from './services/geminiService';
import { CookieState } from './types';

// Constants
const GARLAND_LIGHTS_COUNT = 25;
const COOKIES_COUNT = 3;
const GARLAND_COLORS = ['#FF1744', '#00E676', '#FFEA00', '#2979FF'];
const PREDICTION_CATEGORIES = [
  "Работа и карьера",
  "Дружба и окружение",
  "Хобби и увлечения",
  "Путешествия и открытия",
  "Исполнение желаний"
];
const DEFAULT_CATEGORY = "Планы на 2026";

// Helper function to create initial cookies state
const createInitialCookies = (): CookieState[] =>
  Array.from({ length: COOKIES_COUNT }, (_, i) => ({
    id: i,
    isCracked: false,
    isLoading: false,
  }));

const Garland: React.FC = () => {
  const lights = Array.from({ length: GARLAND_LIGHTS_COUNT });

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none overflow-hidden h-16">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-10"></div>
      <div className="flex justify-around items-start w-full px-1">
        {lights.map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-[1px] h-4 bg-gray-600"></div>
            <div
              className="garland-light w-4 h-5 rounded-full border border-white/20 shadow-lg"
              style={{
                backgroundColor: GARLAND_COLORS[i % GARLAND_COLORS.length],
                animation: `glow ${1.5 + Math.random()}s infinite alternate`,
                boxShadow: `0 0 10px ${GARLAND_COLORS[i % GARLAND_COLORS.length]}`
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [cookies, setCookies] = useState<CookieState[]>(createInitialCookies);
  const [activePrediction, setActivePrediction] = useState<string | null>(null);

  const prefetchPredictions = useCallback(async () => {
    const shuffled = [...PREDICTION_CATEGORIES].sort(() => 0.5 - Math.random()).slice(0, COOKIES_COUNT);
    setCookies(prev => prev.map(c => ({ ...c, isLoading: true, error: false })));

    const fetchPromises = Array.from({ length: COOKIES_COUNT }, async (_, id) => {
      try {
        const text = await generateNewYearPrediction(shuffled[id]);
        setCookies(prev => prev.map(c =>
          c.id === id ? { ...c, prediction: text, isLoading: false } : c
        ));
      } catch (e) {
        setCookies(prev => prev.map(c =>
          c.id === id ? { ...c, isLoading: false, error: true } : c
        ));
      }
    });

    await Promise.all(fetchPromises);
  }, []);

  useEffect(() => {
    prefetchPredictions();
  }, [prefetchPredictions]);

  const handleCookieClick = async (id: number) => {
    const cookie = cookies.find(c => c.id === id);
    if (!cookie || cookie.isCracked) return;

    // If there was an error, retry
    if (cookie.error) {
      setCookies(prev => prev.map(c => c.id === id ? { ...c, isLoading: true, error: false } : c));
      try {
        const text = await generateNewYearPrediction(DEFAULT_CATEGORY);
        setCookies(prev => prev.map(c =>
          c.id === id ? { ...c, isCracked: true, isLoading: false, prediction: text, error: false } : c
        ));
        setActivePrediction(text);
      } catch (error) {
        setCookies(prev => prev.map(c => c.id === id ? { ...c, isLoading: false, error: true } : c));
      }
      return;
    }

    if (cookie.prediction) {
      setCookies(prev => prev.map(c => c.id === id ? { ...c, isCracked: true } : c));
      setActivePrediction(cookie.prediction);
    } else {
      setCookies(prev => prev.map(c => c.id === id ? { ...c, isLoading: true } : c));
      try {
        const text = await generateNewYearPrediction(DEFAULT_CATEGORY);
        setCookies(prev => prev.map(c =>
          c.id === id ? { ...c, isCracked: true, isLoading: false, prediction: text } : c
        ));
        setActivePrediction(text);
      } catch (error) {
        setCookies(prev => prev.map(c => c.id === id ? { ...c, isLoading: false, error: true } : c));
      }
    }
  };

  const resetCookies = () => {
    setCookies(createInitialCookies());
    prefetchPredictions();
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-6 md:py-24">
      <Garland />

      <div className="mb-12 mt-8 flex items-center gap-4 opacity-80">
        <div className="h-[2px] w-12 bg-[#C62828]"></div>
        <div className="text-[#C62828] text-xl font-bold uppercase tracking-tighter">2026</div>
        <div className="h-[2px] w-12 bg-[#C62828]"></div>
      </div>

      <header className="text-center mb-20 max-w-3xl relative">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none uppercase">
          Новогодние предсказания 2026<br />
          <span className="text-[#00E676] font-light italic normal-case">Korean Simple</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed italic opacity-80 font-light">
          Минимализм и магия: разломите печенье, чтобы узнать, что подготовил вам 2026 год
        </p>
      </header>

      <div className="relative p-8 md:p-14 bg-[#1E1E1E] border-2 border-white/5 rounded-lg shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-2 text-[8px] opacity-10 font-bold uppercase tracking-widest text-white rotate-90 origin-top-right">SEOUL 2026</div>
        <main className="flex flex-wrap justify-center gap-8 md:gap-14">
          {cookies.map((cookie) => (
            <CookieItem
              key={cookie.id}
              isCracked={cookie.isCracked}
              isLoading={cookie.isLoading && !cookie.prediction}
              hasError={cookie.error}
              onClick={() => handleCookieClick(cookie.id)}
            />
          ))}
        </main>
      </div>

      <footer className="mt-20 text-center">
        {cookies.some(c => c.isCracked) && (
          <button
            onClick={resetCookies}
            className="px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-[#C62828] hover:text-white transition-all transform active:scale-95 shadow-lg"
          >
            ПОЛУЧИТЬ НОВЫЕ ПЕЧЕНЬЯ
          </button>
        )}
      </footer>

      <div className="fixed bottom-10 left-10 text-6xl opacity-5 hidden xl:block select-none pointer-events-none transform -rotate-12">🧧</div>
      <div className="fixed top-40 right-10 text-6xl opacity-5 hidden xl:block select-none pointer-events-none transform rotate-12">🍊</div>

      <MusicPlayer />

      <PredictionModal
        prediction={activePrediction}
        onClose={() => setActivePrediction(null)}
      />
    </div>
  );
};

export default App;

