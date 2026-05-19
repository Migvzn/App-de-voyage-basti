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
          ? "bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg shadow-sky-200"
          : "bg-slate-100 border border-slate-200"
      )}>
        {role === "assistant"
          ? <Sparkles className="w-4 h-4 text-white" />
          : <User className="w-4 h-4 text-slate-500" />}
      </div>

      <div className={cn("flex-1 max-w-[85%]", role === "user" && "flex flex-col items-end")}>
        {/* Message bubble */}
        {displayContent && (
          <div className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            role === "assistant"
              ? "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm"
              : "bg-sky-500 text-white rounded-tr-sm"
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
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-200">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1 shadow-sm">
        <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

const SUGGESTED_PROMPTS = [
  "Planifie-moi un weekend romantique à Lisbonne 🇵🇹",
  "Un road trip de 7 jours en Italie avec 1 200€",
  "Inspire-moi pour des vacances à 1 500€ en juillet",
  "Meilleurs endroits à voir à Tokyo en 5 jours",
  "Voyage en famille à Barcelone, 4 personnes, août",
  "Escapade de 3 jours à Amsterdam : culture et gastronomie",
];

export default function Chat() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: () => {
      setApiError("⚠️ Impossible de contacter l'IA. Vérifiez que votre clé API Anthropic est configurée dans .env.local");
    },
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
    setApiError(null);
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  const sendSuggestion = (prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const visibleMessages = messages.filter(m => m.role === "user" || m.role === "assistant");

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-200">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-slate-900">voyageo.ai — Agent de voyage</div>
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
              En ligne — Prêt à planifier votre voyage
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => window.location.reload()}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Nouvelle conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Error banner */}
      {apiError && (
        <div className="px-4 sm:px-6 py-3 bg-red-50 border-b border-red-200 text-sm text-red-600">
          {apiError}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        {visibleMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-blue-50 border border-sky-200 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-sky-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Où voulez-vous aller ?</h2>
            <p className="text-slate-500 text-sm max-w-md mb-8">
              Décrivez votre destination de rêve, votre budget et votre style de voyage — je créerai l&apos;itinéraire parfait pour vous.
            </p>
            <div className="grid sm:grid-cols-2 gap-2 w-full max-w-2xl">
              {SUGGESTED_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => sendSuggestion(prompt)}
                  className="text-left px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:text-sky-600 hover:border-sky-300 hover:shadow-sm transition-all"
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
      <div className="border-t border-slate-200 px-4 sm:px-6 py-4 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Posez-moi toutes vos questions sur votre voyage..."
              disabled={isLoading}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-400 transition-colors disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-11 h-11 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl flex items-center justify-center text-white hover:from-sky-600 hover:to-sky-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm shadow-sky-200 shrink-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
        <p className="text-xs text-slate-400 text-center mt-2">
          voyageo.ai peut faire des erreurs. Vérifiez les prix avant de réserver.
        </p>
      </div>
    </div>
  );
}
