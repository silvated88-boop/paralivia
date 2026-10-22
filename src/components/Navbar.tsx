import React from 'react';
import { Volume2, VolumeX, Sparkles, Music, Cake, Gift, MessageSquareHeart, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useMusic } from './BackgroundMusic';

interface NavbarProps {
  onTriggerConfetti: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerConfetti }) => {
  const { isPlaying, isMuted, togglePlay, toggleMute } = useMusic();

  const handleConfettiClick = () => {
    soundManager.playHorn();
    onTriggerConfetti();
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-amber-50/80 border-b border-rose-100/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#inicio" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Cake className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-extrabold text-lg text-rose-950 flex items-center gap-1.5">
              Lívia <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline-block animate-pulse" />
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-rose-500 block -mt-1">
              Edição de Aniversário
            </span>
          </div>
        </a>

        {/* Quick links for desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <a href="#bolo" className="hover:text-rose-600 flex items-center gap-1.5 transition-colors">
            <Cake className="w-4 h-4 text-rose-500" />
            Bolo & Velas
          </a>
          <a href="#mensagens" className="hover:text-rose-600 flex items-center gap-1.5 transition-colors">
            <MessageSquareHeart className="w-4 h-4 text-rose-500" />
            Mural de Carinho
          </a>
          <a href="#jogo" className="hover:text-rose-600 flex items-center gap-1.5 transition-colors">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Mini-Game
          </a>
          <a href="#presente" className="hover:text-rose-600 flex items-center gap-1.5 transition-colors">
            <Gift className="w-4 h-4 text-rose-500" />
            Surpresa
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Music player toggle */}
          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pausar música de fundo' : 'Tocar música da festa (Pabllo Vittar)'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm ${
              isPlaying
                ? 'bg-rose-500 text-white shadow-rose-200'
                : 'bg-white hover:bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">
              {isPlaying ? 'Tocando ♪ Parabéns' : 'Música ♪'}
            </span>
          </button>

          {/* Sound mute button */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Ativar som da música' : 'Mutar música'}
            className="p-2 rounded-full bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 transition-colors"
            aria-label="Controle de Som"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-rose-600" />}
          </button>

          {/* Confetti button */}
          <button
            onClick={handleConfettiClick}
            className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-medium text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md shadow-rose-200 hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Confetes!</span>
          </button>
        </div>
      </div>
    </header>
  );
};
