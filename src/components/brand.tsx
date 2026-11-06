// Símbolo da logo, com a geometria de public/logo.svg. O corte usa a cor do fundo onde está.
export function Symbol({ bg = "#111318", className = "" }: { bg?: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <rect width="120" height="120" fill={bg} />
      <line x1="90" y1="26" x2="30" y2="94" stroke="#1F5BFF" strokeWidth="13" strokeLinecap="round" />
      <line x1="30" y1="26" x2="90" y2="94" stroke={bg} strokeWidth="27" />
      <polyline
        points="30,94 30,26 90,94 90,26"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-1">
      <Symbol className="size-10" />
      <span className="font-display text-2xl font-semibold tracking-[-0.03em]">novix</span>
      <span className="sr-only">{name}</span>
    </span>
  );
}

/** O traço diagonal azul do "N" (mesma inclinação da logo). */
export function Cut({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 26" className={className} aria-hidden="true" focusable="false">
      <line x1="20" y1="3" x2="4" y2="23" stroke="#1F5BFF" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Divisor de seção: o corte diagonal seguido de uma linha fina. */
export function CutDivider() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-3 px-5" aria-hidden="true">
      <Cut className="h-6 w-5 shrink-0" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
      <Cut className="h-4 w-3.5" />
      {children}
    </p>
  );
}

export function ExternalLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

export const buttonPrimary =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-blue px-6 font-semibold text-ink transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0";
export const buttonGhost =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 font-semibold text-ink transition-colors hover:border-blue-text";
