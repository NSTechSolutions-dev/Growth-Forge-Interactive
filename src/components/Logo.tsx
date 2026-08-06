interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  variant?: "light" | "dark";
}

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="My Lead Foundry mark">
      <path
        d="M9 7h7.5v25.5H33V40H9V7Z"
        fill="var(--navy)"
      />
      <g transform="rotate(-45 30 22)">
        <rect x="22" y="8" width="7" height="28" rx="1.5" fill="var(--green)" />
        <rect x="22" y="8" width="19" height="6.5" rx="1.5" fill="var(--green)" />
        <rect x="22" y="19" width="14" height="6.5" rx="1.5" fill="var(--green)" />
      </g>
    </svg>
  );
}

export function Logo({ className = "", showWordmark = true, variant = "light" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      {showWordmark && (
        <span className="font-display text-[1.1rem] font-bold tracking-tight">
          <span style={{ color: variant === "dark" ? "white" : "var(--navy)" }}>MyLead</span>
          <span style={{ color: "var(--green)" }}>Foundry</span>
        </span>
      )}
    </span>
  );
}
