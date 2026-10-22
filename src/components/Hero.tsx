import React, { useState } from 'react';
import { Cake, Sparkles, Heart, PartyPopper, ChevronDown } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { fireHeartConfetti, fireSideCannons } from '../utils/confetti';

interface FloatingBalloon {
  id: number;
  color: string;
  left: string;
  top: string;
  size: string;
  speed: string;
  delay: string;
  popped: boolean;
  label: string;
}

export const Hero: React.FC = () => {
  const [poppedCount, setPoppedCount] = useState(0);
  const [balloons, setBalloons] = useState<FloatingBalloon[]>([
    { id: 1, color: 'from-pink-400 to-rose-500', left: '8%', top: '15%', size: 'w-16 h-20', speed: '4s', delay: '0s', popped: false, label: '💖' },
    { id: 2, color: 'from-amber-300 to-orange-400', left: '16%', top: '55%', size: 'w-20 h-24', speed: '5s', delay: '1s', popped: false, label: '✨' },
    { id: 3, color: 'from-violet-400 to-purple-500', left: '82%', top: '18%', size: 'w-16 h-20', speed: '4.5s', delay: '0.5s', popped: false, label: '🌸' },
    { id: 4, color: 'from-emerald-300 to-teal-400', left: '88%', top: '60%', size: 'w-18 h-22', speed: '5.2s', delay: '1.5s', popped: false, label: '⭐' },
    { id: 5, color: 'from-rose-400 to-pink-500', left: '2%', top: '75%', size: 'w-14 h-18', speed: '4.8s', delay: '0.8s', popped: false, label: '🎉' },
    { id: 6, color: 'from-sky-300 to-indigo-400', left: '76%', top: '80%', size: 'w-16 h-20', speed: '4.2s', delay: '1.2s', popped: false, label: '🎈' },
  ]);

  const handlePopBalloon = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playPop();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartConfetti(x, y);

    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setPoppedCount((c) => c + 1);

    // Re-inflate balloon after 4 seconds for endless fun
    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: false } : b))
      );
    }, 4000);
  };

  const handleHeroConfetti = () => {
    soundManager.playHorn();
    fireSideCannons();
  };

  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-28">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Interactive floating balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-7xl mx-auto">
        {balloons.map((b) => (
          !b.popped ? (
            <div
              key={b.id}
              onClick={(e) => handlePopBalloon(b.id, e)}
              style={{
                left: b.left,
                top: b.top,
                animation: `float-gentle ${b.speed} ease-in-out infinite`,
                animationDelay: b.delay,
              }}
              title="Clique para estourar o balão!"
              className="absolute pointer-events-auto cursor-pointer group select-none transition-transform active:scale-90"
            >
              {/* Balloon Body */}
              <div
                className={`relative ${b.size} rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-b ${b.color} shadow-lg shadow-rose-300/30 flex items-center justify-center text-white/90 text-sm font-bold group-hover:scale-110 transition-transform`}
              >
                {/* Shine highlight */}
                <div className="absolute top-2 left-2 w-3 h-5 bg-white/40 rounded-full rotate-12 blur-[0.5px]" />
                <span className="opacity-80 group-hover:opacity-100">{b.label}</span>
                {/* Balloon knot */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2 bg-inherit rounded-sm" />
                {/* Balloon string */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-stone-400/60" />
              </div>
            </div>
          ) : null
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Top celebratory pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold shadow-sm mb-6 hover:shadow transition-shadow">
          <PartyPopper className="w-4 h-4 text-rose-500" />
          <span>Viva! Hoje é dia de festa e celebração!</span>
          <Sparkles className="w-4 h-4 text-amber-500" />
        </div>

        {/* Main Title */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-stone-900 tracking-tight leading-[1.1] mb-4">
          Parabéns,{' '}
          <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
            Lívia!
          </span>{' '}
          🎉
        </h1>

        {/* Cursive subtitle accent */}
        <p className="font-handwriting text-2xl sm:text-3xl text-rose-700 font-bold mb-6">
          Que seu novo ciclo venha carregado de amor, realizações e muita luz!
        </p>

        {/* Emotional description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-600 leading-relaxed mb-8">
          Criamos este cantinho especial para comemorar cada detalhe de quem você é.
          Assopre as velinhas do seu bolo, celebre com confetes e sinta todo o carinho
          reunido especialmente para você neste dia inesquecível.
        </p>

        {/* Interactive hint if balloons popped */}
        {poppedCount > 0 && (
          <div className="text-xs text-rose-600 font-medium mb-6 animate-bounce">
            🎈 Você já estourou {poppedCount} balõ{poppedCount === 1 ? 'ezinho' : 'ezinhos'}! Clique nos outros balões para mais festa!
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#bolo"
            className="px-6 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-300/50 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          >
            <Cake className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Soprar as Velas</span>
          </a>

          <button
            onClick={handleHeroConfetti}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-rose-50 text-rose-700 font-semibold text-sm sm:text-base border-2 border-rose-200 shadow-sm hover:shadow hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Chuva de Confetes</span>
          </button>

          <a
            href="#mensagens"
            className="px-6 py-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-sm sm:text-base shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>Ver Homenagens</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 sm:mt-16 flex flex-col items-center justify-center text-stone-400">
          <span className="text-xs font-medium uppercase tracking-wider mb-1">
            Role para comemorar
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
