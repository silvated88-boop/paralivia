import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API to generate birthday wishes for Lívia
  app.post('/api/wish', async (req: Request, res: Response) => {
    try {
      const { tone = 'carinhoso', sender = 'Amigo(a)', relation = 'amigo(a)', details = '' } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        const fallbacks: Record<string, string[]> = {
          carinhoso: [
            "Querida Lívia, que este novo ciclo seja repleto de amor, saúde, paz e sorrisos sinceros. Você ilumina todos ao seu redor com sua presença tão doce e especial! Parabéns! 💖🎂✨",
            "Feliz aniversário, Lívia! Que a vida lhe reserve as mais belas surpresas, bênçãos sem medida e sonhos realizados todos os dias. Você merece o mundo! 🌸🎉",
          ],
          divertido: [
            "Parabéns, Lívia! Mais um ano de pura juventude, sabedoria acumulada e paciência para aguentar a gente! Que nunca falte bolo, brigadeiro e boas risadas! 🥳🎈🍰",
            "Lívia, hoje as calorias do bolo não contam! Que seu novo ano seja tão incrível quanto você (e com muito juízo, ou pelo menos com muitas histórias boas)! Parabéns! 🚀🎁",
          ],
          poetico: [
            "Lívia, que cada amanhecer do seu novo ano traga novas melodias de esperança e poesia ao seu caminhar. Continue sendo essa luz radiante que aquece os corações! Feliz Vida! 🌟✨💐",
          ],
          emocionante: [
            "Lívia querida, celebrar sua vida é um privilégio. Obrigado(a) por ser quem é, por cada abraço, cada conversa e pela amizade sincera. Estarei sempre na torcida pelo seu sucesso e felicidade! Te amo! 🥹❤️🎉",
          ],
        };

        const list = fallbacks[tone] || fallbacks.carinhoso;
        const chosen = list[Math.floor(Math.random() * list.length)];
        return res.json({ wish: chosen, source: 'curated' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Escreva uma mensagem de aniversário inesquecível em português brasileiro para a aniversariante Lívia.
Tom desejado: ${tone} (por exemplo: afetuoso, divertido, emocionante ou poético).
Quem está enviando: ${sender} (relação: ${relation || 'pessoa querida'}).
${details ? `Detalhes ou lembrança especial: ${details}` : ''}

Requisitos:
- O nome "Lívia" deve aparecer com carinho.
- Texto natural, caloroso, autêntico, entre 2 e 4 frases.
- Inclua emojis festivos (🎂, ✨, 🎉, 💖).
- Retorne apenas o texto da mensagem, sem introduções ou aspas.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const wish = response.text?.trim() || "Feliz aniversário, Lívia! Que seu dia seja tão maravilhoso e radiante quanto você!";
      return res.json({ wish, source: 'ai' });
    } catch (err: unknown) {
      console.error('Error generating wish with Gemini:', err);
      return res.json({
        wish: "Querida Lívia, que seu aniversário seja mágico e cheio de momentos felizes ao lado de quem você ama! Parabéns! 🎂🎉✨",
        source: 'fallback',
      });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
