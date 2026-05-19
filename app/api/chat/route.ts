import { streamText, convertToModelMessages, UIMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { TRAVEL_AGENT_SYSTEM_PROMPT } from "@/lib/prompts";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system: TRAVEL_AGENT_SYSTEM_PROMPT,
    messages: modelMessages,
    maxOutputTokens: 4096,
    temperature: 0.7,
  });

  return result.toUIMessageStreamResponse();
}
