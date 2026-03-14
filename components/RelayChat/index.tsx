"use client";

import { useState, useRef, useEffect } from "react";

const RYUJIN_API = "https://ryujin.inferis.app/api/chat";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
};

const RelayChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "Renzo is online. I can help you build your brief — describe your project and I'll guide you through it.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [briefContext, setBriefContext] = useState("");
  const [showBrief, setShowBrief] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim(), timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.role !== "system")
        .concat(userMsg)
        .map((m) => ({ role: m.role, content: m.content }));

      const body: any = {
        messages: history,
        model: "claude-sonnet-4-20250514",
      };
      if (briefContext.trim()) body.briefContext = briefContext.trim();

      const res = await fetch(RYUJIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("API error " + res.status);

      // Handle streaming or JSON response
      const contentType = res.headers.get("content-type") || "";
      let assistantText = "";

      if (contentType.includes("text/event-stream")) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const d = JSON.parse(line.slice(6));
                  if (d.type === "text" || d.content) assistantText += d.content || d.text || "";
                } catch {}
              }
            }
          }
        }
      } else {
        const data = await res.json();
        assistantText = data.reply || data.content || data.message || JSON.stringify(data);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantText, timestamp: new Date().toISOString() },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error: " + err.message, timestamp: new Date().toISOString() },
      ]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full bg-b-surface1">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-stroke-subtle">
        <div className="w-2 h-2 rounded-full bg-primary2 animate-pulse" />
        <div className="text-heading text-t-primary">Renzo</div>
        <div className="text-small text-t-tertiary ml-auto">RELAY CHAT</div>
      </div>

      {/* Brief context toggle */}
      <div className="px-4 py-2 border-b border-stroke-subtle">
        <button
          onClick={() => setShowBrief(!showBrief)}
          className="text-small text-primary1 font-medium hover:underline"
        >
          {showBrief ? "▾ Hide brief context" : "▸ Add brief context"}
        </button>
        {showBrief && (
          <textarea
            value={briefContext}
            onChange={(e) => setBriefContext(e.target.value)}
            placeholder="Paste campaign brief or context here — prepended to every message..."
            className="w-full mt-2 p-3 rounded-xl border border-stroke2 bg-b-surface2 text-heading text-t-primary placeholder:text-t-tertiary resize-none outline-none focus:border-stroke-focus"
            rows={3}
          />
        )}
      </div>

      {/* Messages */}
      <div ref={feedRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-stroke2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-heading leading-relaxed ${
                m.role === "user"
                  ? "bg-b-primary text-t-light rounded-br-md"
                  : m.role === "system"
                  ? "bg-primary2/10 text-primary2 border border-primary2/20 rounded-bl-md"
                  : "bg-b-surface2 text-t-primary border border-stroke-subtle rounded-bl-md"
              }`}
            >
              {m.content.split("\n").map((line, j) => (
                <p key={j} className={j > 0 ? "mt-2" : ""}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-b-surface2 border border-stroke-subtle px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-t-tertiary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-t-tertiary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-t-tertiary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-stroke-subtle">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask Renzo anything..."
            className="flex-1 px-4 py-3 rounded-xl border border-stroke2 bg-b-surface2 text-heading text-t-primary placeholder:text-t-tertiary outline-none focus:border-stroke-focus transition-colors"
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className={`px-6 py-3 rounded-xl text-button text-t-light transition-all ${
              loading || !input.trim()
                ? "bg-b-primary/30 cursor-not-allowed"
                : "bg-b-primary hover:bg-b-primary/90 active:scale-[0.98] shadow-hover"
            }`}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelayChat;
