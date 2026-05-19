"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Send, Bot, User, Loader2, Sparkles, RefreshCw } from "lucide-react";
import ItineraryDisplay from "./ItineraryDisplay";
import { TravelItinerary } from "@/types";

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
    .map(p => p.text)
    .join("");
}

function parseItinerary(content: string): TravelItinerary | null {
  try {
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) return null;
    const parsed = JSON.parse(jsonMatch[1]);
    if (parsed.destination && parsed.budget) return parsed as TravelItinerary;
    return null;
  } catch {
    return null;
  }
}

function MessageBubble({ message }: { message: UIMessage }) {
  const content = getMessageText(message);
  const role = message.role as "user" | "assistant";
  const itinerary = role === "assistant" ? parseItinerary(content) : null;
  // Remove JSON blocks from displayed text
  const displayContent = content.replace(/```json\n[\s\S]*?\n```/g, "").trim();

  return (
    <div className={cn("flex gap-3 mb-6", role === "user" ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1",
        role === "assistant"
          ? "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20"
          : "bg-[#1a1a1a] border border-[#333333]"
      )}>
        {role === "assistant"
          ? <Sparkles className="w-4 h-4 text-white" />
          : <User className="w-4 h-4 text-[#888888]" />}
      </div>

      <div className={cn("flex-1 max-w-[85%]", role === "user" && "flex flex-col items-end")}>
        {/* Message bubble */}
        {displayContent && (
          <div className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            role === "assistant"
              ? "bg-[#111111] border border-[#222222] text-[#f5f5f5] rounded-tl-sm"
              : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-sm"
          )}>
            {displayContent.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return <h3 key={i} className="font-bold text-base mb-2 mt-3 first:mt-0">{line.slice(3)}</h3>;
              }
              if (line.startsWith("### ")) {
                return <h4 key={i} className="font-semibold mb-1 mt-2 first:mt-0">{line.slice(4)}</h4>;
              }
              if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
                return <p key={i} className="font-semibold mb-1">{line.slice(2, -2)}</p>;
              }
              if (line.startsWith("- ") || line.startsWith("• ")) {
                return <li key={i} className="ml-4 mb-0.5 list-disc">{line.slice(2)}</li>;
              }
              if (line.match(/^\d+\.\s/)) {
                return <li key={i} className="ml-4 mb-0.5 list-decimal">{line.replace(/^\d+\.\s/, "")}</li>;
              }
              if (line === "") return <br key={i} />;
              return <p key={i} className="mb-0.5">{line}</p>;
            })}
          </div>
        )}

        {/* Itinerary display if detected */}
        {itinerary && (
          <div className="mt-4 w-full">
            <ItineraryDisplay itinerary={itinerary} />
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="bg-[#111111] border border-[#222222] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

const SUGGESTED_PROMPTS = [
  "Plan a 7-day trip to Rome for 2 people on €2,500 budget",
  "Best 10-day itinerary for Japan in autumn, solo traveler",
  "Budget honeymoon in Santorini for €3,000",
  "Weekend in Paris from London — what's the best plan?",
];

export default function Chat() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Pre-fill from URL
  useEffect(() => {
    if (initialQuery && !hasStarted) {
      setInputValue(initialQuery);
    }
  }, [initialQuery, hasStarted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    setHasStarted(true);
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  const sendSuggestion = (prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const visibleMessages = messages.filter(m => m.role === "user" || m.role === "assistant");

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-[#111111] px-4 sm:px-6 py-4 flex items-center justify-between bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-[#f5f5f5]">ILUR AI Travel Agent</div>
            <div className="text-xs text-[#555555] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
              Online — Ready to plan your trip
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => window.location.reload()}
            className="p-2 rounded-lg text-[#555555] hover:text-[#888888] hover:bg-[#111111] transition-colors"
            title="New conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        {visibleMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-2">Where to next?</h2>
            <p className="text-[#555555] text-sm max-w-md mb-8">
              Tell me your dream destination, budget, and travel style — I&apos;ll craft the perfect itinerary for you.
            </p>
            <div className="grid sm:grid-cols-2 gap-2 w-full max-w-xl">
              {SUGGESTED_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => sendSuggestion(prompt)}
                  className="text-left px-4 py-3 bg-[#111111] border border-[#222222] rounded-xl text-sm text-[#888888] hover:text-[#f5f5f5] hover:border-indigo-500/30 hover:bg-[#131320] transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {visibleMessages.map(message => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-[#111111] px-4 sm:px-6 py-4 bg-[#0a0a0a]">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask me anything about travel..."
              disabled={isLoading}
              className="w-full bg-[#111111] border border-[#222222] rounded-xl px-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#444444] focus:outline-none focus:border-indigo-500/50 transition-colors disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-11 h-11 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 shrink-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
        <p className="text-xs text-[#333333] text-center mt-2">
          ILUR can make mistakes. Verify booking prices before purchasing.
        </p>
      </div>
    </div>
  );
}
