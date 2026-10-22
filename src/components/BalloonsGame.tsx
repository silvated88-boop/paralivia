import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, Play, RotateCcw, PartyPopper } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { fireHeartConfetti, fireCelebrationConfetti } from '../utils/confetti';
import { Compliment } from '../types';

interface GameBalloon {
  id: number;
  x: number; // percentage across container
  y: number; // percentage from bottom
  speed: number;
  color: string;
  emoji: string;
  compliment: string;
}

const COMPLIMENTS: Compliment[] = [
  { id: 1, text: 'Seu sorriso tem o dom de iluminar qualquer ambiente!', emoji: '✨' },
  { id: 2, text: 'Um coração bondoso, acolhedor e cheio de generosidade!', emoji: '💖' },
  { id: 3, text: 'Sua determinação e garra para conquistar seus sonhos!', emoji: '🌟' },
  { id: 4, text: 'A melhor companhia para conversar e dar risadas!', emoji: '🌸' },
  { id: 5, text: 'Pura elegância, autenticidade e energia boa!', emoji: '💎' },
  { id: 6, text: 'Uma amiga fiel que todo mundo sonha em ter por perto!', emoji: '🥰' },
  { id: 7, text: 'Sua criatividade e inteligência que encantam!', emoji: '🎨' },
];

const BALLOON_COLORS = [
  'from-pink-400 to-rose-500',
  'from-amber-400 to-orange-400',
  'from-violet-400 to-purple-500',
  'from-emerald-400 to-teal-500',
  'from-sky-400 to-blue-500',
  'from-rose-400 to-red-500',
];

export const BalloonsGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [balloons, setBalloons] = useState<GameBalloon[]>([]);
  const [recentCompliment, setRecentCompliment] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const requestRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const nextIdRef = useRef<number>(1);

  const startGame = () => {
    soundManager.playHorn();
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(25);
    setGameOver(false);
    setRecentCompliment(null);
    setBalloons([]);
    lastSpawnRef.current = Date.now();
  };

  // Timer countdown
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPlaying(false);
          setGameOver(true);
          soundManager.playChime();
          fireCelebrationConfetti();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Game animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const updateFrame = () => {
      const now = Date.now();

      // Spawn new balloon every 700ms
      if (now - lastSpawnRef.current > 700) {
        lastSpawnRef.current = now;
        const comp = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
        const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];

        setBalloons((prev) => [
          ...prev,
          {
            id: nextIdRef.current++,
            x: 10 + Math.random() * 80,
            y: -10, // Start just below bottom
            speed: 0.35 + Math.random() * 0.45,
            color,
            emoji: comp.emoji,
            compliment: comp.text,
          },
        ]);
      }

      // Move existing balloons up
      setBalloons((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y + b.speed }))
          .filter((b) => b.y < 110) // Remove if left top
      );

      requestRef.current = requestAnimationFrame(updateFrame);
    };

    requestRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  const handlePop = (balloon: GameBalloon, e: React.MouseEvent) => {
    soundManager.playPop();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartConfetti(x, y);

    setScore((s) => s + 10);
    setRecentCompliment(balloon.compliment);
    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
  };

  return (
    <section id="jogo" className="py-16 sm:py-20 bg-amber-50/60">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Mini-Game Interativo</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900 mb-2">
            Pegue os Balões da Lívia! 🎈
          </h2>
          <p className="text-stone-600 max-w-md mx-auto text-sm sm:text-base">
            Estoure os balões flutuantes para marcar pontos e revelar elogios e qualidades
            maravilhosas da Lívia!
          </p>
        </div>

        {/* Game Stage */}
        <div className="relative w-full h-96 sm:h-[420px] rounded-3xl bg-gradient-to-b from-sky-100 via-rose-50 to-amber-50 border-2 border-rose-200 overflow-hidden shadow-xl shadow-rose-100/50 flex flex-col justify-between p-4">
          
          {/* Top Bar Status */}
          <div className="flex items-center justify-between z-30 bg-white/80 backdrop-blur px-4 py-2 rounded-2xl border border-rose-100">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold text-stone-600">Pontos:</span>
              <span className="font-display font-black text-rose-600 text-base">{score}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-600">Tempo:</span>
              <span className={`font-display font-black text-base ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-stone-800'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Floating Balloons Canvas */}
          <div className="absolute inset-0 overflow-hidden">
            {balloons.map((b) => (
              <div
                key={b.id}
                onClick={(e) => handlePop(b, e)}
                style={{
                  left: `${b.x}%`,
                  bottom: `${b.y}%`,
                }}
                className="absolute cursor-pointer select-none group transform -translate-x-1/2 transition-transform hover:scale-110 active:scale-95"
              >
                <div
                  className={`w-14 h-18 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-b ${b.color} shadow-md flex items-center justify-center text-white text-base font-bold`}
                >
                  <span className="group-hover:scale-125 transition-transform">{b.emoji}</span>
                  <div className="absolute top-1.5 left-2 w-2 h-3.5 bg-white/40 rounded-full rotate-12" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-inherit rounded-xs" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-stone-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Compliment Popup Badge */}
          {recentCompliment && isPlaying && (
            <div className="z-30 self-center px-4 py-2 rounded-full bg-white/95 border border-rose-200 shadow-md text-center max-w-sm animate-in fade-in slide-in-from-top-1 duration-200">
              <p className="text-xs sm:text-sm font-semibold text-rose-700">
                "{recentCompliment}"
              </p>
            </div>
          )}

          {/* Overlays: Start Screen or Game Over */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 z-40 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg mb-4">
                <PartyPopper className="w-8 h-8" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-stone-900 mb-2">
                Pronto(a) para estourar balões?
              </h3>
              <p className="text-stone-600 text-sm max-w-xs mb-6">
                Clique nos balões antes que eles voem embora para descobrir qualidades da Lívia!
              </p>
              <button
                onClick={startGame}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Começar Agora!</span>
              </button>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 z-40 bg-white/85 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
              <span className="text-4xl mb-2">🏆🎉✨</span>
              <h3 className="font-display font-extrabold text-2xl text-stone-900 mb-1">
                Festa Completa!
              </h3>
              <p className="font-display font-bold text-rose-600 text-xl mb-2">
                Você fez {score} pontos!
              </p>
              <p className="text-stone-600 text-xs sm:text-sm max-w-sm mb-6">
                Lívia é tudo isso e muito mais! Obrigado por comemorar com tanta alegria.
              </p>
              <button
                onClick={startGame}
                className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Jogar Novamente</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
