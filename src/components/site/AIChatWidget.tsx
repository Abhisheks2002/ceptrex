import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How fast can you build an AI agent?",
  "What does an n8n project cost?",
  "Do you work with healthcare?",
];

const KB: { match: RegExp; reply: string }[] = [
  { match: /price|cost|how much|pricing/i, reply: "Our fixed-price builds start at $4,950 for a single agent and scale to enterprise retainers. See full pricing on /pricing — or book a free audit and we'll quote within 48 hours." },
  { match: /time|fast|how long|days/i, reply: "Most production agents ship in 14–28 days. Discovery week 1, build weeks 2–3, launch week 4. See /process for the full breakdown." },
  { match: /whatsapp/i, reply: "We build WhatsApp agents on the official Meta Cloud API — multilingual, multi-broker, CRM-connected. Typical timeline is 14–21 days starting at $5,500." },
  { match: /n8n|automation/i, reply: "We deploy self-hosted n8n in your VPC, Git-versioned, with 24/7 monitoring. Check /n8n-projects for 24 production examples." },
  { match: /voice|phone|call/i, reply: "Voice agents run on Vapi + ElevenLabs with sub-300ms latency. Native EHR & CRM integrations. Starting at $6,950." },
  { match: /healthcare|hipaa|clinic/i, reply: "Yes — we've shipped voice receptionists and patient-intake agents for clinic groups. See /industries/healthcare for our HIPAA-aware approach." },
  { match: /book|call|demo|audit/i, reply: "Best next step is our free 30-min AI audit. Head to /book-call and pick a slot — or email hello@ceptrex.com." },
];

function reply(input: string): string {
  for (const k of KB) if (k.match.test(input)) return k.reply;
  return "Great question. The fastest way to get a precise answer is our free 30-min AI audit — head to /book-call and we'll map your workflows live.";
}

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Hi — I'm Nexa, Ceptrex's AI consultant. Ask me about AI agents, n8n, WhatsApp AI, pricing or timelines." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "assistant", content: reply(text) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI chat"
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-5 py-3.5 text-sm font-semibold text-primary-foreground glow-purple hover:scale-[1.03] transition-transform"
        >
          <MessageSquare className="h-4 w-4" />
          Ask Nexa
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-3rem))] flex flex-col rounded-2xl border border-border bg-surface/95 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold">Nexa</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  AI consultant · online
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-3.5 py-2.5 text-sm"
                      : "max-w-[88%] text-sm leading-relaxed text-foreground/90"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {typing && (
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse [animation-delay:240ms]" />
              </div>
            )}
            {msgs.length === 1 && (
              <div className="pt-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border bg-surface-elevated hover:border-primary/60 hover:text-foreground text-muted-foreground transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-border flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, timelines…"
              className="flex-1 bg-surface-elevated border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:border-primary/60"
            />
            <button
              type="submit"
              aria-label="Send"
              className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
