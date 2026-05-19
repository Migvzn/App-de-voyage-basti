import { Suspense } from "react";
import Chat from "@/components/Chat";

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-[#0a0a0a]">
        <div className="text-[#555555] text-sm">Loading chat...</div>
      </div>
    }>
      <Chat />
    </Suspense>
  );
}
