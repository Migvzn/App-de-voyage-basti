"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const SUGGESTIONS = [
  "🌊 Week-end romantique à Lisbonne, budget 800€",
  "🍕 Road trip 7 jours en Italie, 2 personnes, 1 500€",
  "🌸 5 jours à Tokyo, première fois au Japon",
  "🏖️ Vacances en famille à Barcelone, août, 4 personnes",
  "🌴 10 jours à Bali, budget 2 000€, aventure et détente",
  "🏙️ 3 jours à Amsterdam : culture, musées et gastronomie",
];

export default function ChatPage() {
  const { messages, sendMessage, status, error } = useChat();

  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) setShowSuggestions(false);
  }, [messages]);

  function handleSuggestion(text: string) {
    const cleaned = text.replace(/^[^\w\s]*\s*/, "").trim();
    setInput(cleaned);
    setShowSuggestions(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input.trim() });
    setInput("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit();
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-baseline gap-0.5">
          <span className="text-lg font-bold text-sky-500">voyageo</span>
          <span className="text-lg font-semibold text-slate-400">.ai</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-500">Agent IA actif</span>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Message de bienvenue */}
          {messages.length === 0 && (
            <div className="text-center pt-8 pb-4">
              <div className="text-5xl mb-4">✈️</div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Bonjour ! Je suis VOYAGEO</h1>
              <p className="text-slate-500 max-w-md mx-auto">
                Votre agent de voyage IA. Décrivez-moi votre voyage idéal et je planifie tout pour vous.
              </p>
            </div>
          )}

          {/* Erreur API */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
              <p className="text-red-600 text-sm font-medium">⚠️ {error.message || "Impossible de contacter l'IA. Vérifiez votre clé ANTHROPIC_API_KEY dans .env.local"}</p>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => {
            const textContent = msg.parts
              .filter((p) => p.type === "text")
              .map((p) => (p as { type: "text"; text: string }).text)
              .join("");

            return (
              <div
                key={msg.id}
                className={`flex gap-3 animate-fade-up ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center text-white text-sm shrink-0 shadow-sm shadow-sky-200">
                    ✈️
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-sky-500 text-white rounded-tr-sm"
                      : "bg-white text-slate-800 border border-slate-200 rounded-tl-sm shadow-sm"
                  }`}
                >
                  {textContent}
                </div>
                {msg.role === "user" && (
                  <div className="w-9 h-9 bg-slate-200 rounded-xl flex items-center justify-center text-sm shrink-0">
                    👤
                  </div>
                )}
              </div>
            );
          })}

          {/* Indicateur de chargement */}
          {isLoading && (
            <div className="flex gap-3 justify-start animate-fade-up">
              <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center text-white text-sm shrink-0">
                ✈️
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-sky-400 rounded-full dot-1"></div>
                  <div className="w-2 h-2 bg-sky-400 rounded-full dot-2"></div>
                  <div className="w-2 h-2 bg-sky-400 rounded-full dot-3"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      {showSuggestions && messages.length === 0 && (
        <div className="px-4 pb-2 shrink-0">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-slate-400 mb-2 text-center">Idées pour commencer</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(s)}
                  className="text-left text-sm text-slate-600 bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-600 rounded-xl px-4 py-3 transition-all hover:shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-slate-200 px-4 py-4 shrink-0">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end bg-slate-50 border border-slate-200 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 rounded-2xl p-3 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Décrivez votre voyage idéal... (Entrée pour envoyer)"
              rows={1}
              className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-sm resize-none outline-none leading-relaxed min-h-[24px] max-h-[120px]"
              style={{ height: "auto" }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = Math.min(t.scrollHeight, 120) + "px";
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white disabled:text-slate-400 rounded-xl p-2.5 transition-colors shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">Entrée pour envoyer · Maj+Entrée pour nouvelle ligne</p>
        </form>
      </div>
    </div>
  );
}
