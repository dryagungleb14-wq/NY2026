
import React from 'react';

interface PredictionModalProps {
  prediction: string | null;
  onClose: () => void;
}

const PredictionModal: React.FC<PredictionModalProps> = ({ prediction, onClose }) => {
  if (!prediction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="bg-[#1A1A1A] border-2 border-white/20 w-full max-w-lg p-10 md:p-16 text-center relative overflow-hidden rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-[#C62828]"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00E676]"></div>

        <div className="flex flex-col items-center">
          <div className="mb-8 text-[#C62828] font-bold tracking-[0.5em] text-xs uppercase">
            Ваше предсказание
          </div>

          <p className="text-2xl md:text-3xl font-light leading-snug mb-12 text-white font-serif italic">
            «{prediction}»
          </p>

          <button
            onClick={onClose}
            className="w-full md:w-auto px-12 py-4 bg-white text-black font-bold text-xs tracking-widest hover:bg-[#C62828] hover:text-white transition-all active:scale-95"
          >
            ПРИНЯТЬ С БЛАГОДАРНОСТЬЮ
          </button>
        </div>

        <div className="absolute top-10 right-10 border-2 border-[#C62828] text-[#C62828] text-[8px] p-1 font-bold rotate-12 opacity-30">
          福
        </div>
      </div>
    </div>
  );
};

export default PredictionModal;
