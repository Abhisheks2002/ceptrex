import ceptrexLockup from "@/assets/ceptrex-logo.png";
import ceptrexIcon from "@/assets/ceptrex-icon.png";

type LogoProps = {
  /** Pixel height of the logo. Width auto-scales to preserve aspect ratio. */
  height?: number;
  /** When false, renders the icon mark only (no wordmark). */
  showWordmark?: boolean;
  className?: string;
  priority?: boolean;
};

/**
 * Official Ceptrex logo lockup — uses the brand artwork exactly as supplied.
 * Aspect ratio is preserved automatically; only height is controlled.
 */
export function Logo({
  height = 40,
  showWordmark = true,
  className = "",
  priority = false,
}: LogoProps) {
  const src = showWordmark ? ceptrexLockup : ceptrexIcon;
  // Source artwork is 1632x352 (lockup) / 352x352 (icon).
  const aspect = showWordmark ? 1632 / 352 : 1;
  const width = Math.round(height * aspect);

  return (
    <img
      src={src}
      alt="CEPTREX AI Automation Agency Logo"
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={`object-contain select-none drop-shadow-[0_0_22px_rgba(108,99,255,0.25)] transition-opacity duration-200 ${className}`}
      style={{ height, width: "auto" }}
      draggable={false}
    />
  );
}
