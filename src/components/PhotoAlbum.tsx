import React from 'react';
import { Camera, Sparkles, Heart, Star, Sun, Compass } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';

interface MemoryCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  rotation: string;
  tag: string;
  color: string;
}

export const PhotoAlbum: React.FC = () => {
  const memories: MemoryCard[] = [
    {
      id: 1,
      title: 'Sorriso que Ilumina Tudo',
      description: 'Aquele sorriso largo que muda o astral de qualquer lugar e acolhe todo mundo.',
      icon: <Sun className="w-6 h-6 text-amber-500" />,
      rotation: '-rotate-2',
      tag: 'Energia Radiante',
      color: 'from-amber-100 to-rose-50',
    },
    {
      id: 2,
      title: 'Histórias & Aventuras',
      description: 'Cada momento ao seu lado se transforma em uma lembrança marcante para guardar no coração.',
      icon: <Compass className="w-6 h-6 text-sky-500" />,
      rotation: 'rotate-2',
      tag: 'Espírito Livre',
      color: 'from-sky-100 to-indigo-50',
    },
    {
      id: 3,
      title: 'Coração de Ouro',
      description: 'Sua empatia, lealdade e cuidado com as pessoas fazem de você uma joia rara.',
      icon: <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />,
      rotation: '-rotate-1',
      tag: 'Afeto Genuíno',
      color: 'from-rose-100 to-pink-50',
    },
    {
      id: 4,
      title: 'O Futuro Brilhante',
      description: 'Tudo o que você tocar vai florescer! Que este novo ano seja a prova do seu enorme talento.',
      icon: <Star className="w-6 h-6 text-purple-500" />,
      rotation: 'rotate-1',
      tag: 'Grandes Conquistas',
      color: 'from-purple-100 to-amber-50',
    },
  ];

  const handleCardClick = (e: React.MouseEvent) => {
    soundManager.playPop();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartConfetti(x, y);
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-50/60 border-y border-stone-200/60">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-3">
            <Camera className="w-3.5 h-3.5 text-rose-600" />
            <span>Mural de Qualidades</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900 mb-3">
            O Que Torna a Lívia Tão Especial ✨
          </h2>
          <p className="text-stone-600 max-w-md mx-auto text-sm sm:text-base">
            Pequenos lembretes das características que fazem todos ao seu redor terem
            tanto orgulho e carinho por você.
          </p>
        </div>

        {/* Polaroid grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {memories.map((card) => (
            <div
              key={card.id}
              onClick={handleCardClick}
              className={`bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer border border-stone-200/80 transform hover:-translate-y-1.5 hover:rotate-0 duration-300 ${card.rotation} relative group select-none`}
            >
              {/* Tape sticker on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-200/60 backdrop-blur-xs border border-amber-300/40 rotate-1 shadow-xs" />

              {/* Card visual frame */}
              <div
                className={`w-full h-36 rounded-xl bg-gradient-to-br ${card.color} flex flex-col items-center justify-center mb-4 p-4 text-center border border-stone-100 group-hover:scale-102 transition-transform`}
              >
                <div className="w-12 h-12 rounded-full bg-white/90 shadow-sm flex items-center justify-center mb-2">
                  {card.icon}
                </div>
                <span className="text-xs font-bold text-stone-700 bg-white/70 px-2.5 py-0.5 rounded-full shadow-2xs">
                  {card.tag}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display font-bold text-base text-stone-900 mb-1.5 leading-snug">
                {card.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {card.description}
              </p>

              {/* Cute heart at bottom right */}
              <div className="mt-3 flex justify-end">
                <Sparkles className="w-3.5 h-3.5 text-rose-400 group-hover:scale-125 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
