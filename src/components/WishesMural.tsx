import React from 'react';
import { MessageSquareHeart } from 'lucide-react';

interface BirthdayMessage {
  id: string;
  sender: string;
  message: string;
  avatarColor: string;
}

const MESSAGES: BirthdayMessage[] = [
  {
    id: 'msg-bruna',
    sender: 'Bruna',
    message:
      'Feliz aniversário! 🥳🎂 Que Deus abençoe muito sua vida e que esse novo ciclo seja repleto de saúde, paz, felicidade e grandes conquistas. Que nunca faltem motivos para sorrir, pessoas especiais ao seu lado e sonhos para realizar. Que seu dia seja lindo e sua vida ainda mais! Muitas felicidades hoje e sempre! 💖✨',
    avatarColor: 'from-pink-400 to-rose-500',
  },
  {
    id: 'msg-gabriel',
    sender: 'Gabriel',
    message:
      'Lívia, feliz aniversário! 🥳🎂💖\n\nQue seu novo ciclo seja cheio de saúde, felicidade, amor, conquistas e muitos motivos para sorrir! Que não faltem boas notícias, momentos especiais e, claro, paciência para aguentar a correria do dia a dia! 😂☕\n\nQue você continue sendo essa pessoa querida e que a vida te surpreenda com muitas coisas boas. Você merece tudo de melhor, tanto na vida pessoal quanto profissional!\n\nAproveite muito seu dia, curta cada momento e que venham muitos anos de alegrias, realizações e histórias boas para contar! Parabéns! 🥰🎉',
    avatarColor: 'from-amber-400 to-orange-500',
  },
  {
    id: 'msg-layse',
    sender: 'Layse',
    message:
      'Feliz aniversário, minha querida! 🥹💖🎂\n\nQue Deus abençoe muito sua vida, ilumine seus caminhos e encha seu coração de amor, paz e felicidade. Que esse novo ciclo venha repleto de sonhos realizados, conquistas lindas e momentos que façam seus olhos brilharem! ✨💕\n\nAproveite muito seu dia e receba todo o carinho que você merece! Que seu novo ciclo seja tão lindo quanto seu coração. Feliz vida! ❤️🎉',
    avatarColor: 'from-rose-400 to-pink-600',
  },
  {
    id: 'msg-amabile',
    sender: 'Amabile',
    message:
      'Feliz aniversário, minha ermã! ❤️ Que seu novo ciclo seja cheio de saúde, amor, paz e motivos para sorrir. Que você tenha força para realizar seus sonhos e seja cercada de carinho em cada passo.\n\nSou muito grata por ter você na minha vida e sermos uma para outra! Aproveite muito o seu dia e nunca se esqueça do quanto é amada. Te amo! 🎂💕',
    avatarColor: 'from-purple-400 to-pink-500',
  },
  {
    id: 'msg-michelle',
    sender: 'Michelle',
    message:
      'Feliz aniversário, cunhada! ❤️🎉\n\nQue Deus abençoe muito sua vida, ilumine seus caminhos e que nunca faltem saúde, felicidade, amor e motivos para sorrir.\n\nMesmo com pouco tempo de convivência como cunhadas, fico feliz por termos essa relação e por poder compartilhar momentos com você. Sei que, no dia a dia, nem sempre pensamos igual e às vezes temos nossas diferenças, mas isso faz parte da convivência. O importante é que, além de tudo, existe carinho e respeito.\n\nDesejo de coração que esse novo ciclo seja cheio de conquistas, amadurecimento, realizações e coisas boas. Que você continue crescendo, aprendendo e conquistando tudo aquilo que deseja. Aproveite muito seu dia, você merece! Feliz vida! 🥰🎂❤️',
    avatarColor: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'msg-johnny',
    sender: 'Johnny',
    message:
      'Parabéns, Lívia! Tudo de bom pra ti! Que teu novo ciclo seja incrível, cheio de coisas boas e muitas conquistas. Felicidades! ✌️',
    avatarColor: 'from-sky-400 to-blue-500',
  },
];

export const WishesMural: React.FC = () => {
  return (
    <section id="mensagens" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5 text-rose-600" />
            <span>Mural de Homenagens</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900 mb-3">
            Recadinhos & Desejos para Lívia 💌
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
            Mensagens cheias de afeto, carinho e votos sinceros enviados especialmente
            para celebrar o seu aniversário!
          </p>
        </div>

        {/* Masonry Columns Layout: cards adapt naturally to text length */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className="break-inside-avoid bg-white/95 rounded-3xl p-6 sm:p-7 border border-rose-100/90 shadow-sm hover:shadow-lg transition-all duration-200 relative overflow-hidden"
            >
              {/* Decorative top color bar */}
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${msg.avatarColor}`} />

              {/* Header with avatar & sender name */}
              <div className="flex items-center gap-3 mb-4 pt-1">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr ${msg.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0`}
                >
                  {msg.sender.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-display font-bold text-stone-900 text-lg leading-tight">
                    {msg.sender}
                  </h4>
                </div>
              </div>

              {/* Message Body fitted exactly to text */}
              <div className="text-stone-700 text-sm sm:text-[14.5px] leading-relaxed whitespace-pre-line font-normal">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
