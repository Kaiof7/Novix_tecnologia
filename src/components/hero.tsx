import { defaultWhatsappLink, empresa, portfolio } from "@/lib/config";
import { buttonGhost, buttonPrimary, ExternalLink } from "./brand";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  const second = portfolio.length > 0 ? { href: "#trabalhos", label: "Ver trabalhos" } : { href: "#servicos", label: "Ver serviços" };
  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid grid-pan pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-14 md:grid-cols-[1.4fr_1fr] md:pb-24 md:pt-24">
        <div className="rise">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{empresa.nome}</p>
          <h1 className="mt-4 font-display text-[2.5rem] font-bold leading-[1.04] tracking-[-0.03em] text-balance sm:text-6xl">
            {empresa.frase}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{empresa.fraseApoio}</p>
          <p className="mt-6 max-w-xl border-l-2 border-blue pl-4 text-ink">{empresa.resultado}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ExternalLink href={defaultWhatsappLink} className={buttonPrimary}>
              Falar no WhatsApp
            </ExternalLink>
            <a href={second.href} className={buttonGhost}>
              {second.label}
            </a>
          </div>
        </div>
        <div className="rise-delay">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
