"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ChatPanel } from "@/components/chat/ChatPanel";

function ChatInner() {
  const params = useSearchParams();
  const seed = params.get("q") ?? undefined;
  return <ChatPanel seed={seed} />;
}

export default function ChatPage() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <ChatInner />
      </Suspense>
    </AppShell>
  );
}
