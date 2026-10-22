import React, { useState } from 'react';
import { Gift, Sparkles, Heart, CheckCircle2, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { fireCelebrationConfetti } from '../utils/confetti';

export const GiftBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (isOpen) return;
    soundManager.playHorn();
    setIsOpen(true);
    fireCelebrationConfetti();
  };

  const handleReset = () => {
    soundManager.playPop();
    setIsOpen(false);
  };

  return (
    <section id="presente" className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-3">
            <Gift className="w-3.5 h-3.5 text-rose-600" />
            <span>Presente Misterioso</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900 mb-3">
            Uma Surpresa Especial para a Lívia 🎁
          </h2>
          <p className="text-stone-600 max-w-md mx-auto text-sm sm:text-base">
            Preparamos uma lembrança única guardada dentro desta caixinha de presente.
            Clique para desembrulhar!
          </p>
        </div>

        {/* Gift Box Container */}
        <div className="bg-white/90 rounded-3xl p-6 sm:p-12 shadow-xl shadow-rose-100/50 border border-rose-100 flex flex-col items-center">
          
          {!isOpen ? (
            /* Closed Box */
            <div
              onClick={handleOpenGift}
              className="cursor-pointer group flex flex-col items-center select-none py-6 transition-transform hover:scale-105 active:scale-95"
            >
              {/* Box Lid with Bow */}
              <div className="relative">
                {/* Ribbon Bow */}
                <div className="flex justify-center -mb-2 z-20 relative">
                  <div className="w-8 h-8 rounded-full border-4 border-amber-400 bg-amber-300 shadow-sm rotate-45 transform origin-bottom-right" />
                  <div className="w-8 h-8 rounded-full border-4 border-amber-400 bg-amber-300 shadow-sm -rotate-45 transform origin-bottom-left" />
                  <div className="absolute top-4 w-4 h-4 rounded-full bg-amber-500 shadow-xs z-30" />
                </div>

                {/* Lid */}
                <div className="w-48 sm:w-56 h-10 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-md relative z-10 flex items-center justify-center border-t border-rose-300">
                  <div className="w-8 h-full bg-amber-300 shadow-xs" />
                </div>
              </div>

              {/* Box Base */}
              <div className="w-44 sm:w-52 h-40 rounded-b-2xl bg-gradient-to-b from-rose-600 to-rose-700 shadow-xl relative flex justify-center border-b-4 border-rose-800">
                {/* Vertical Ribbon */}
                <div className="w-8 h-full bg-amber-300 shadow-xs" />
                {/* Horizontal Ribbon */}
                <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-6 bg-amber-300 shadow-xs" />
                
                {/* Tag for Lívia */}
                <div className="absolute bottom-4 right-3 bg-amber-50 text-rose-800 px-3 py-1 rounded-md text-xs font-handwriting font-bold shadow-md rotate-6 border border-amber-200">
                  Para: Lívia ❤️
                </div>
              </div>

              {/* Pulse Hint */}
              <div className="mt-8 flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold group-hover:bg-rose-100 transition-colors animate-pulse">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Clique na caixa para abrir a surpresa!</span>
              </div>
            </div>
          ) : (
            /* Open Certificate / Gift voucher */
            <div className="w-full max-w-xl animate-in zoom-in-95 fade-in duration-300">
              <div className="relative rounded-3xl bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 border-4 border-amber-300/80 p-6 sm:p-10 shadow-2xl text-center overflow-hidden">
                
                {/* Certificate Watermark Stamp */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border-4 border-rose-200/40 flex items-center justify-center rotate-12 pointer-events-none">
                  <span className="text-rose-300/40 font-black text-xs uppercase tracking-widest text-center">
                    OFICIAL ★ LÍVIA DAY
                  </span>
                </div>

                <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white flex items-center justify-center shadow-md mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-widest text-rose-600 block mb-1">
                  Certificado de Felicidade Ilimitada
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-stone-900 mb-2">
                  Passaporte Oficial do Novo Ciclo
                </h3>
                <p className="font-handwriting font-bold text-xl text-rose-600 mb-6">
                  Concedido com muito amor para: <span className="underline decoration-amber-400">Lívia</span>
                </p>

                {/* Vouchers list */}
                <div className="space-y-3 text-left max-w-md mx-auto mb-8 bg-white/80 p-4 sm:p-5 rounded-2xl border border-rose-100">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                    <span><strong>365 dias</strong> de saúde blindada, luz e muita sorte no seu caminho.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                    <span><strong>Acesso VIP</strong> a abraços sinceros, risadas sem motivo e amizades leais.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                    <span><strong>Vale-bolo & doces</strong> à vontade sem peso na consciência!</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                    <span><strong>Garantia cósmica</strong> de que seus sonhos mais queridos vão se realizar.</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      soundManager.playHorn();
                      fireCelebrationConfetti();
                    }}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Celebrar Certificado!</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-600 border border-stone-200 text-xs sm:text-sm font-semibold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                    <span>Embrulhar de Novo</span>
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
