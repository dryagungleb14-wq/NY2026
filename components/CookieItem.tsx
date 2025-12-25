
import React from 'react';

interface CookieItemProps {
  isCracked: boolean;
  isLoading: boolean;
  hasError?: boolean;
  onClick: () => void;
}

const CookieItem: React.FC<CookieItemProps> = ({ isCracked, isLoading, hasError, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isCracked || isLoading}
      className={`
        relative w-36 h-36 md:w-44 md:h-44 flex flex-col items-center justify-center 
        bg-[#252525] border-2 border-white/10 transition-all duration-300 group rounded-lg
        ${!isCracked && !isLoading && !hasError ? 'cookie-shake cursor-pointer hover:border-[#C62828] hover:shadow-[0_0_20px_rgba(198,40,40,0.3)]' : ''}
        ${hasError ? 'cursor-pointer border-red-500/50 hover:border-red-500' : ''}
        ${!hasError && (isCracked || isLoading) ? 'cursor-default' : ''}
        ${isLoading ? 'animate-pulse' : 'shadow-xl'}
      `}
    >
      {/* Festive Ribbon Accent */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-[#C62828] border-b-2 border-x-2 border-black/50 transition-transform duration-500 ${isCracked ? '-translate-y-full opacity-0' : ''}`}></div>

      <div className={`relative transition-all duration-700 ease-in-out ${isCracked ? 'scale-110' : 'scale-100'}`}>
        {isLoading ? (
          <div className="text-4xl animate-spin text-white">⏳</div>
        ) : hasError ? (
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl">❌</div>
            <div className="text-xs text-red-400">Попробовать снова</div>
          </div>
        ) : isCracked ? (
          /* "Classic Tan" Cracked Fortune Cookie with Paper Strip */
          <div className="relative flex items-center justify-center w-36 h-24">
            {/* The Paper Strip - Central Focus */}
            <div className="absolute w-28 h-7 bg-white border border-black -rotate-2 z-0 flex items-center justify-center shadow-lg">
              <div className="w-20 h-[1px] bg-black opacity-10"></div>
            </div>

            {/* Left Fragment */}
            <svg width="65" height="65" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -translate-x-6 -rotate-15 z-10 drop-shadow-2xl">
              <path d="M52 12C35 8 10 15 8 35C6 50 18 58 32 52C46 46 56 32 52 12Z" fill="#E8C694" stroke="#000" strokeWidth="1.5" />
              <path d="M48 18C35 15 20 20 18 32" stroke="#D3A26B" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            </svg>

            {/* Right Fragment */}
            <svg width="65" height="65" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform translate-x-6 rotate-15 z-10 drop-shadow-2xl">
              <path d="M12 12C29 8 54 15 56 35C58 50 46 58 32 52C18 46 8 32 12 12Z" fill="#E8C694" stroke="#000" strokeWidth="1.5" />
              <path d="M16 18C29 15 44 20 46 32" stroke="#D3A26B" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            </svg>
          </div>
        ) : (
          /* "Classic Tan" Whole Cookie with Paper hint */
          <div className="relative flex items-center justify-center w-32 h-32 group-hover:scale-110 transition-transform">
            {/* Paper hint sticking out - subtle and realistic */}
            <div className="absolute -top-3 right-4 w-16 h-6 bg-white border border-black -rotate-12 z-0"></div>

            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-xl">
              <path d="M22 52C22 32 42 22 52 22C62 22 82 32 82 52C82 72 67 87 52 77C37 87 22 72 22 52Z" fill="#D3A26B" />
              <path
                d="M20 50C20 30 40 20 50 20C60 20 80 30 80 50C80 70 65 85 50 75C35 85 20 70 20 50Z"
                fill="#E8C694"
                stroke="#000"
                strokeWidth="1.5"
              />
              <path
                d="M50 22C50 45 45 60 30 70"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path d="M35 35C45 32 55 32 65 35" stroke="#F9E8D2" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            </svg>
          </div>
        )}
      </div>

      <div className="mt-4 text-[10px] tracking-[0.2em] font-extrabold uppercase text-gray-400">
        {isLoading ? 'Думаем' : hasError ? 'Ошибка' : isCracked ? 'Открыто' : 'Разломить'}
      </div>

      {/* Traditional Corner Accents */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20"></div>
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20"></div>
    </button>
  );
};

export default CookieItem;

