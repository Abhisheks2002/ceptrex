import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

type Props = {
  calLink: string;
  onError?: () => void;
};

/**
 * Heavy Cal.com bundle isolated so it can be lazy()-loaded.
 */
export default function CalInner({ calLink, onError }: Props) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cal = await getCalApi({ namespace: "ceptrex-booking" });
        if (cancelled) return;
        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            light: { "cal-brand": "#6C63FF" },
            dark: {
              "cal-brand": "#6C63FF",
              "cal-bg": "#0A0A0F",
              "cal-bg-emphasis": "#16161F",
              "cal-text": "#F5F5F7",
              "cal-text-emphasis": "#FFFFFF",
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (err) {
        console.error("Cal.com init failed", err);
        onError?.();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [onError]);

  return (
    <Cal
      namespace="ceptrex-booking"
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view", theme: "dark" }}
    />
  );
}
