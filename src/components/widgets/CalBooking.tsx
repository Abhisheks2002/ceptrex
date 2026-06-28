import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Calendar, Loader2, ExternalLink } from "lucide-react";

type Props = {
  calLink?: string;
  className?: string;
};

const FALLBACK_URL = "https://cal.com/";

// Lazy-loaded Cal.com inner — only fetched after user opt-in / scroll-in.
const CalInner = lazy(() => import("./CalInner"));

/**
 * Performance-optimized Cal.com embed:
 *  - Adds DNS-prefetch + preconnect to cal.com on mount.
 *  - Defers the heavy @calcom/embed-react bundle until the widget container
 *    is within the viewport (IntersectionObserver) OR the user clicks "Show calendar".
 *  - Shows a skeleton + 3s "preparing your calendar" message.
 *  - Falls back to opening cal.com in a new tab if the embed fails.
 */
export function CalBooking({ calLink = "ceptrex/30min", className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [longLoad, setLongLoad] = useState(false);
  const [failed, setFailed] = useState(false);

  // Preconnect hints — cheap, fire-and-forget.
  useEffect(() => {
    const hints: HTMLLinkElement[] = [];
    const add = (rel: string, href: string, crossOrigin?: string) => {
      const l = document.createElement("link");
      l.rel = rel;
      l.href = href;
      if (crossOrigin) l.crossOrigin = crossOrigin;
      document.head.appendChild(l);
      hints.push(l);
    };
    add("dns-prefetch", "https://cal.com");
    add("preconnect", "https://cal.com", "");
    add("preconnect", "https://app.cal.com", "");
    return () => {
      hints.forEach((l) => l.parentNode?.removeChild(l));
    };
  }, []);

  // IntersectionObserver — mount when in view.
  useEffect(() => {
    if (shouldMount) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldMount]);

  // 3s "preparing" message after mount begins.
  useEffect(() => {
    if (!shouldMount) return;
    const t = window.setTimeout(() => setLongLoad(true), 3000);
    return () => window.clearTimeout(t);
  }, [shouldMount]);

  const fallbackUrl = `https://cal.com/${calLink}`;

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl border border-border bg-background/40 backdrop-blur relative ${className}`}
      style={{ height: "80vh", minHeight: 720, maxHeight: 980, overflow: "hidden" }}
    >
      {!shouldMount && (
        <button
          type="button"
          onClick={() => setShouldMount(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Calendar className="h-8 w-8 text-cyan" />
          <span>Tap to load booking calendar</span>
        </button>
      )}

      {shouldMount && !failed && (
        <Suspense fallback={<CalSkeleton longLoad={longLoad} />}>
          <CalInner calLink={calLink} onError={() => setFailed(true)} />
        </Suspense>
      )}

      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <div className="font-display text-lg font-semibold">Calendar didn't load</div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Open the booking page directly — it takes a second.
          </p>
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Open booking in new tab
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}

function CalSkeleton({ longLoad }: { longLoad: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
      <Loader2 className="h-6 w-6 animate-spin text-cyan" />
      <div className="text-sm text-muted-foreground">
        {longLoad ? "Preparing your booking calendar…" : "Loading calendar…"}
      </div>
      <div className="grid grid-cols-7 gap-2 w-full max-w-md mt-4 opacity-40">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-md bg-surface-elevated animate-pulse" />
        ))}
      </div>
    </div>
  );
}
