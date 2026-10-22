import React from 'react';
import { Heart, Sparkles, Cake } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { fireCelebrationConfetti } from '../utils/confetti';

export const Footer: React.FC = () => {
  const handleFooterConfetti = () => {
    soundManager.playHorn();
    fireCelebrationConfetti();
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 mx-auto flex items-center justify-center text-white shadow-lg mb-4">
          <Cake className="w-6 h-6" />
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-2">
          Parabéns, Lívia! 🎉
        </h3>
        <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Que a alegria deste dia reverbere por todos os meses do seu novo ano.
          Você é muito especial para todos nós!
        </p>

        <button
          onClick={handleFooterConfetti}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md hover:scale-105 active:scale-95 transition-all mb-8"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Soltar Mais Confetes!</span>
        </button>

        <div className="pt-6 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Feito com todo o carinho do mundo para você</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 text-rose-400">
            <Heart className="w-3.5 h-3.5 fill-rose-400 inline" /> Feliz Aniversário!
          </span>
        </div>
      </div>
    </footer>
  );
};
