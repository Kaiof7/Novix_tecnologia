// Ícones de traço no estilo do "N": linha arredondada branca com um detalhe azul.
const paths: Record<string, React.ReactNode> = {
  agendamento: (
    <>
      <rect x="5" y="8" width="38" height="34" rx="4" />
      <path d="M5 17h38M15 4v8M33 4v8" />
      <path d="M17 29l5 5 9-10" stroke="#1F5BFF" />
    </>
  ),
  automacao: (
    <>
      <path d="M38 18a15 15 0 0 0-27-3M10 30a15 15 0 0 0 27 3" />
      <path d="M11 7v8h8M37 41v-8h-8" stroke="#1F5BFF" />
    </>
  ),
  "sob-medida": (
    <>
      <rect x="13" y="4" width="22" height="40" rx="4" />
      <path d="M21 39h6" />
      <path d="M19 13h10M19 20h10M19 27h6" stroke="#1F5BFF" />
    </>
  ),
  sites: (
    <>
      <rect x="4" y="8" width="40" height="32" rx="3" />
      <path d="M4 16h40" />
      <path d="M11 24h14M11 31h22" stroke="#1F5BFF" />
    </>
  ),
  nfc: (
    <>
      <rect x="6" y="6" width="26" height="36" rx="4" />
      <path d="M36 16a12 12 0 0 1 0 16M41 11a19 19 0 0 1 0 26" stroke="#1F5BFF" />
    </>
  ),
};

export function ServiceIcon({ id, className = "size-12" }: { id: string; className?: string }) {
  const content = paths[id];
  if (!content) return null;
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {content}
    </svg>
  );
}
