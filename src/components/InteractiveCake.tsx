import React, { useState } from 'react';
import { Wind, Flame, Sparkles, RefreshCw, Utensils, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { fireCelebrationConfetti } from '../utils/confetti';
import { FortuneSlice } from '../types';

export const InteractiveCake: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [cutSlice, setCutSlice] = useState<FortuneSlice | null>(null);
  const [slicesCutCount, setSlicesCutCount] = useState(0);

  const fortunes: FortuneSlice[] = [
    {
      id: 1,
      title: 'Fatia da Alegria Infinita 🌈',
      blessing: 'Que cada dia do seu novo ano traga motivos genuínos para gargalhar alto e celebrar a vida!',
      icon: '✨',
      color: 'from-amber-100 to-rose-100 border-amber-300',
    },
    {
      id: 2,
      title: 'Fatia do Amor e Aconchego 💖',
      blessing: 'Cercada de abraços sinceros, amigos fiéis e pessoas que valorizam cada pedacinho do seu ser!',
      icon: '🌸',
      color: 'from-rose-100 to-pink-100 border-rose-300',
    },
    {
      id: 3,
      title: 'Fatia do Sucesso & Conquistas 🚀',
      blessing: 'Projetos decolando, metas batidas e o reconhecimento brilhante que o seu esforço merece!',
      icon: '⭐',
      color: 'from-purple-100 to-indigo-100 border-purple-300',
    },
    {
      id: 4,
      title: 'Fatia de Saúde e Serenidade 🌿',
      blessing: 'Energia vital renovada, mente em paz e equilíbrio em todos os seus passos!',
      icon: '🍃',
      color: 'from-emerald-100 to-teal-100 border-emerald-300',
    },
    {
      id: 5,
      title: 'Fatia das Viagens & Aventuras ✈️',
      blessing: 'Passaportes carimbados, novos horizontes e histórias inesquecíveis para contar!',
      icon: '🌍',
      color: 'from-sky-100 to-blue-100 border-sky-300',
    },
  ];

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    soundManager.playBlow();
    setCandlesLit(false);
    setWishMade(true);
    fireCelebrationConfetti();
  };

  const handleRelight = () => {
    soundManager.playChime();
    setCandlesLit(true);
  };

  const handleCutSlice = () => {
    soundManager.playHorn();
    const nextIndex = slicesCutCount % fortunes.length;
    setCutSlice(fortunes[nextIndex]);
    setSlicesCutCount((prev) => prev + 1);
  };

  return (
    <section id="bolo" className="py-16 sm:py-24 bg-gradient-to-b from-transparent via-rose-50/50 to-transparent">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Momento Mais Esperado</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900 mb-3">
            O Bolo de Aniversário da Lívia 🎂
          </h2>
          <p className="text-stone-600 max-w-lg mx-auto text-sm sm:text-base">
            Faça um pedido com todo o coração e assopre as velinhas! Depois, corte uma fatia
            para descobrir sua bênção especial para este ano.
          </p>
        </div>

        {/* Cake Container */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-6 sm:p-10 shadow-xl shadow-rose-100 border border-rose-100 flex flex-col items-center">
          
          {/* Cake Illustration */}
          <div className="relative w-72 sm:w-80 h-72 flex flex-col items-center justify-end select-none my-4">
            
            {/* Candles Row */}
            <div className="flex justify-center gap-6 sm:gap-8 mb-1 z-20">
              {[1, 2, 3, 4, 5].map((candleIndex) => (
                <div key={candleIndex} className="relative flex flex-col items-center">
                  {/* Candle Flame */}
                  {candlesLit ? (
                    <div
                      onClick={handleBlowCandles}
                      title="Clique para assoprar!"
                      className="cursor-pointer group flex flex-col items-center -mb-0.5"
                    >
                      <div className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 animate-flame shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
                      <div className="w-2 h-3 -mt-3 rounded-full bg-blue-300 opacity-60" />
                    </div>
                  ) : (
                    /* Smoke puff after blow */
                    <div className="h-6 flex flex-col items-center justify-end">
                      <div className="w-1.5 h-4 bg-stone-300 rounded-full opacity-60 animate-pulse -translate-y-1" />
                    </div>
                  )}

                  {/* Candle Wick */}
                  <div className="w-0.5 h-2 bg-stone-700" />

                  {/* Candle Cylinder */}
                  <div className="w-3.5 h-12 rounded-t-sm bg-gradient-to-r from-rose-200 via-pink-100 to-rose-300 border border-rose-300/40 shadow-sm relative overflow-hidden">
                    {/* Stripes */}
                    <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#f43f5e,#f43f5e_2px,transparent_2px,transparent_6px)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Cake Tier 1 (Top Layer) */}
            <div className="w-48 h-16 rounded-2xl bg-gradient-to-b from-rose-100 via-pink-100 to-rose-200 border-2 border-rose-200/80 shadow-md relative flex items-center justify-around px-2 z-10">
              {/* Frosting drips */}
              <div className="absolute -top-1 inset-x-2 flex justify-between">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-4 h-3 bg-white rounded-b-full shadow-xs -mt-1" />
                ))}
              </div>
              {/* Strawberry toppings */}
              <span className="text-xl">🍓</span>
              <span className="text-xl">✨</span>
              <span className="text-xl">🍓</span>
            </div>

            {/* Cake Tier 2 (Middle Layer) */}
            <div className="w-60 h-20 -mt-2 rounded-2xl bg-gradient-to-b from-amber-50 via-rose-50 to-pink-100 border-2 border-rose-200/80 shadow-md relative flex items-center justify-around px-4 z-0">
              {/* Middle frosting wave */}
              <div className="absolute -top-1.5 inset-x-3 flex justify-between">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-4 h-3.5 bg-rose-200/80 rounded-b-full shadow-xs" />
                ))}
              </div>
              <div className="font-handwriting font-bold text-rose-600 text-lg sm:text-xl tracking-wide select-none">
                Lívia ✨
              </div>
            </div>

            {/* Cake Tier 3 (Bottom Layer) */}
            <div className="w-72 sm:w-80 h-20 -mt-2 rounded-2xl bg-gradient-to-b from-rose-200 via-pink-200 to-rose-300 border-2 border-rose-300 shadow-lg relative flex items-center justify-center px-4">
              {/* Bottom pearls/decor */}
              <div className="absolute -top-1.5 inset-x-4 flex justify-between">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3 bg-white rounded-b-full shadow-xs" />
                ))}
              </div>
              <div className="flex gap-4 text-rose-500">
                <Heart className="w-4 h-4 fill-rose-400" />
                <Sparkles className="w-4 h-4 text-amber-400" />
                <Heart className="w-4 h-4 fill-rose-400" />
              </div>
            </div>

            {/* Cake Platter */}
            <div className="w-80 sm:w-92 h-4 rounded-full bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 shadow-md border border-stone-300 -mt-1" />
          </div>

          {/* Controls below Cake */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {candlesLit ? (
              <button
                onClick={handleBlowCandles}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Wind className="w-5 h-5 animate-pulse" />
                <span>Assoprar as Velinhas!</span>
              </button>
            ) : (
              <button
                onClick={handleRelight}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-700 font-semibold text-sm border border-stone-200 shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Reacender Velas</span>
                <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
              </button>
            )}

            <button
              onClick={handleCutSlice}
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Utensils className="w-4 h-4" />
              <span>Cortar uma Fatia da Sorte 🍰</span>
            </button>
          </div>

          {/* Wish Message when blown */}
          {wishMade && !candlesLit && (
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-lg animate-in fade-in zoom-in duration-300">
              <span className="text-2xl mb-1 block">🌟🕯️✨</span>
              <p className="font-display font-bold text-rose-900 text-base sm:text-lg mb-1">
                Pedido feito com sucesso!
              </p>
              <p className="text-rose-700 text-xs sm:text-sm">
                Lívia, que todos os desejos mais puros que você guardou no peito se realizem com
                surpresas maravilhosas neste novo ciclo. Parabéns!
              </p>
            </div>
          )}

          {/* Fortune Slice Revealed */}
          {cutSlice && (
            <div className={`mt-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-br ${cutSlice.color} border shadow-md max-w-md w-full animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-white/80 shadow-xs flex items-center justify-center text-xl">
                  {cutSlice.icon}
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-900 text-base">
                    {cutSlice.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    Sua bênção de aniversário
                  </span>
                </div>
              </div>
              <p className="text-stone-700 text-sm leading-relaxed">
                "{cutSlice.blessing}"
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
