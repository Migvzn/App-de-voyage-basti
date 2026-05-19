import { Suspense } from "react";
import Chat from "@/components/Chat";

export const metadata = {
  title: "Chat — Planifiez votre voyage",
  description: "Discutez avec votre agent de voyage IA et planifiez votre voyage parfait en quelques minutes.",
};

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-slate-50">
        <div className="text-slate-400 text-sm">Chargement du chat...</div>
      </div>
    }>
      <Chat />
    </Suspense>
  );
}
