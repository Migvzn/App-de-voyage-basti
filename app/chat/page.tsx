"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { isTextUIPart, DefaultChatTransport } from "ai";
import Link from "next/link";
import { Send, Plane, ArrowLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  { emoji: "🌊", text: "Week-end romantique à Lisbonne, budget 800€" },
  { emoji: "🍕", text: "Road trip 7 jours en Italie, 2 personnes, 1 500€" },
  { emoji: "🌸", text: "5 jours à Tokyo, première fois au Japon" },
  { emoji: "🏖️", text: "Vacances famille à Barcelone, 4 personnes, août" },
  { emoji: "🌴", text: "10 jours à Bali, aventure et bien-être, 2 000€" },
  { emoji: "🗽", text: "Long week-end à New York, budget 1 200€" },
];

export default function ChatPage() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function onInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const lines = e.target.value.split("\n").length;
    setRows(Math.min(lines, 4));
  }

  function handleSend() {
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input.trim() });
    setInput("");
    setRows(1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function applySuggestion(text: string) {
    setInput(text);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function getMessageText(msg: typeof messages[number]): string {
    return msg.parts
      .filter(isTextUIPart)
      .map((p) => p.text)
      .join("");
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-[#FAFAF7]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-4 shrink-0 shadow-sm">
        <Link href="/" className="p-2 rounded-xl hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FF5A3C] rounded-xl flex items-center justify-center shadow-sm shadow-orange-200">
            <Plane className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-[#0A0A0A] text-sm leading-none">Wanderly AI</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">En ligne · claude-sonnet-4-5</span>
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => window.location.reload()}
            className="ml-auto text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all"
          >
            Nouveau voyage
          </button>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

          {/* Welcome */}
          {isEmpty && (
            <div className="text-center pt-6 pb-2 animate-fade-up">
              <div className="w-16 h-16 bg-[#FF5A3C] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
                <span className="text-3xl">✈️</span>
              </div>
              <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">Bonjour, je suis Wanderly</h1>
              <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
                Décrivez votre voyage idéal — même flou — et je planifie tout : vols, hôtels, restos, activités et budget.
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
              <p className="text-red-500 text-sm">⚠️ {error.message.includes("ANTHROPIC") ? "Clé API manquante — ajoutez ANTHROPIC_API_KEY dans votre fichier .env.local" : error.message}</p>
            </div>
          )}

          {/* Messages list */}
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 animate-fade-up",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 bg-[#FF5A3C] rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm shadow-orange-200">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}

              <div className={cn(
                "max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-[#0A0A0A] text-white rounded-tr-sm"
                  : "bg-white border border-gray-100 text-[#0A0A0A] rounded-tl-sm shadow-sm whitespace-pre-wrap"
              )}>
                {getMessageText(msg)}
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center shrink-0 mt-1 text-sm">
                  👤
                </div>
              )}
            </div>
          ))}

          {/* Loading */}
          {isLoading && (
            <div className="flex gap-3 justify-start animate-fade-up">
              <div className="w-8 h-8 bg-[#FF5A3C] rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-orange-200">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-[#FF5A3C] rounded-full dot-bounce" />
                  <div className="w-2 h-2 bg-[#FF5A3C] rounded-full dot-bounce" />
                  <div className="w-2 h-2 bg-[#FF5A3C] rounded-full dot-bounce" />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      {isEmpty && (
        <div className="px-4 pb-3 shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => applySuggestion(s.text)}
                  className="text-left text-xs text-gray-600 bg-white border border-gray-200 hover:border-[#FF5A3C]/40 hover:text-[#FF5A3C] hover:bg-orange-50 rounded-xl px-3 py-2.5 transition-all leading-snug"
                >
                  <span className="mr-1.5">{s.emoji}</span>
                  {s.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end bg-gray-50 border border-gray-200 focus-within:border-[#FF5A3C]/50 focus-within:ring-2 focus-within:ring-[#FF5A3C]/10 rounded-2xl px-4 py-3 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={onInput}
              onKeyDown={onKeyDown}
              rows={rows}
              placeholder="Décrivez votre voyage idéal... (Entrée pour envoyer)"
              className="flex-1 bg-transparent text-[#0A0A0A] placeholder-gray-400 text-sm resize-none outline-none leading-relaxed"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-9 h-9 bg-[#FF5A3C] hover:bg-[#E8432A] disabled:bg-gray-200 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all shrink-0 shadow-sm shadow-orange-200 disabled:shadow-none"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Entrée pour envoyer · Maj+Entrée pour nouvelle ligne</p>
        </div>
      </div>
    </div>
  );
}
