"use client";
import { useState } from "react";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Modal } from "@/components/ui/Modal";

export function ChatFab() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg transition hover:scale-105 hover:bg-[var(--color-primary-600)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)]"
      >
        💬
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[var(--color-foreground)]">Trip Assistant</h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-1 text-xs text-[color:var(--color-foreground)/0.8] hover:bg-[var(--color-primary-50)]"
            aria-label="Close chat"
          >
            Close
          </button>
        </div>
        <ChatPanel />
      </Modal>
    </>
  );
}
