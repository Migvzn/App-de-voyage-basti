import { anthropic } from "@ai-sdk/anthropic";

export const travelModel = anthropic("claude-haiku-4-5-20251001");

export const travelModelConfig = {
  maxTokens: 4096,
  temperature: 0.7,
};
