import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

const KEY = "ceptrex.cookie.consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* no-op */
    }
  }, []);

  if (!visible) return null;

  const decide = (v: "accept" | "decline") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* no-op */
    }
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl">
      <div className="rounded-2xl border border-border bg-surface/95 backdrop-blur-xl shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 border border-primary/30">
            <Cookie className="h-4 w-4 text-cyan" />
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We use cookies for analytics and to improve your experience. See our{" "}
            <a href="/privacy-policy" className="text-cyan hover:underline">
              privacy policy
            </a>
            .
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => decide("decline")}
            className="px-4 py-2 rounded-full text-sm border border-border hover:bg-surface-elevated transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => decide("accept")}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary to-cyan text-primary-foreground"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
