import ceptrexIcon from "@/assets/ceptrex-icon.png";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
};

/**
 * Ceptrex brand lockup: gradient hexagon "C" icon + CEPTREX wordmark.
 * Wordmark is rendered as live text so it stays crisp at any size and
 * adapts to the surface color.
 */
export function Logo({
  size = 36,
  showWordmark = true,
  className = "",
  wordmarkClassName = "",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={ceptrexIcon}
        alt="Ceptrex"
        width={size}
        height={size}
        loading="eager"
        decoding="async"
        className="object-contain shrink-0 drop-shadow-[0_0_18px_rgba(108,99,255,0.35)] transition-transform duration-300 group-hover:scale-110"
        style={{ width: size, height: size }}
      />
      {showWordmark && (
        <span
          className={`font-display font-semibold tracking-[0.22em] text-foreground ${wordmarkClassName}`}
          style={{ fontSize: Math.round(size * 0.48) }}
        >
          CEPTREX
        </span>
      )}
    </span>
  );
}
