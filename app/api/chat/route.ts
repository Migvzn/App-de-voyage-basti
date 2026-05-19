import { streamText, convertToModelMessages, UIMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { TRAVEL_AGENT_SYSTEM_PROMPT } from "@/lib/prompts";

export const runtime = "edge";

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "Clé API Anthropic manquante. Configurez ANTHROPIC_API_KEY dans votre .env.local" },
      { status: 500 }
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-sonnet-4-5"),
    system: TRAVEL_AGENT_SYSTEM_PROMPT,
    messages: modelMessages,
    maxOutputTokens: 8192,
    temperature: 0.7,
  });

  return result.toUIMessageStreamResponse();
}
