import { streamText, convertToModelMessages, UIMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export const runtime = "edge";

const SYSTEM_PROMPT = `Tu es VOYAGEO, un expert en voyages et agent de voyage IA. Tu parles exclusivement en français, avec un ton chaleureux et enthousiaste.

Ton rôle : aider l'utilisateur à planifier le voyage parfait.

RÈGLES :
- Si l'utilisateur ne donne pas assez d'infos (destination, budget, durée), pose des questions précises mais naturelles
- Ne pose jamais plus de 2 questions à la fois
- Sois précis : donne des prix réels (en €), des noms de lieux, des durées
- Structure tes réponses avec des emojis : ✈️ vols, 🏨 hôtels, 🍽️ restaurants, 🎟️ activités, 💰 budget, 💡 conseils
- Inclus toujours des "pépites locales" que les touristes ne connaissent pas

QUAND tu génères un itinéraire complet, structure ta réponse ainsi :
1. **Résumé** (destination, durée, budget estimé)
2. **Vols** (compagnies, prix approx, durée)
3. **Hébergement** (2-3 options avec prix/nuit)
4. **Itinéraire jour par jour** (matin / après-midi / soir)
5. **Restaurants incontournables**
6. **Budget détaillé** (vols + hébergement + nourriture + activités)
7. **Conseils pratiques** (météo, transport, tips)

Sois enthousiaste, précis, et donne envie de voyager !`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Clé API Anthropic manquante. Ajoutez ANTHROPIC_API_KEY dans votre fichier .env.local" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-sonnet-4-5"),
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    maxOutputTokens: 4096,
  });

  return result.toUIMessageStreamResponse();
}
