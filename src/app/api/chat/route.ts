import { NextResponse } from "next/server";
import { runConcierge, type ConciergeInput } from "@/lib/concierge";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `Tu es Wanderly, concierge de voyage. Tu es proactif, chaleureux, jamais commercial.
Tu proposes toujours 3 options (éco / équilibré / premium). Tu ne demandes jamais plus de 3 infos pour cadrer un voyage.
Tu utilises les données réelles fournies — jamais d'invention de prix. Si une info manque, tu le dis honnêtement.
Réponds en français, ton concis et concret, en 4 phrases maximum.`;

/**
 * POST /api/chat
 * body: { messages: { role, text }[] }
 * → { text, cards, suggestions }
 *
 * Sans ANTHROPIC_API_KEY : moteur concierge déterministe (démo complète).
 * Avec clé : la prose vient de Claude, les cartes restent issues de la
 * recherche structurée (prix réels, jamais d'hallucination).
 */
export async function POST(req: Request) {
  let messages: ConciergeInput[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const base = runConcierge(messages);
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return NextResponse.json({ ...base, engine: "concierge" });
  }

  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: key });
    const model = process.env.ANTHROPIC_MODEL_CHAT ?? "claude-sonnet-4-6";

    const res = await client.messages.create({
      model,
      max_tokens: 400,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: messages.map((m) => ({
        role: m.role,
        content: m.text,
      })),
    });

    const text = res.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();

    return NextResponse.json({
      text: text || base.text,
      cards: base.cards,
      suggestions: base.suggestions,
      engine: "claude",
    });
  } catch {
    return NextResponse.json({ ...base, engine: "concierge" });
  }
}
