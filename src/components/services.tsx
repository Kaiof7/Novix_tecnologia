import { empresa, serviceWhatsappLink } from "@/lib/config";
import { formatPrice } from "@/lib/price";
import { buttonPrimary, Cut, Eyebrow, ExternalLink } from "./brand";
import { ServiceIcon } from "./icons";

function priceLabel(cents: number | null) {
  return cents == null ? "Sob orçamento" : `A partir de ${formatPrice(cents)}`;
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <Eyebrow>serviços</Eyebrow>
      <h2 id="servicos-titulo" className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
        Serviços para o seu negócio
      </h2>
      <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {empresa.servicos.map((s, i) => {
          const external = s.botaoLink !== "";
          return (
            <li key={s.id} className="reveal card flex flex-col rounded-3xl p-6">
              <div className="flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-blue/15">
                  <ServiceIcon id={s.id} className="size-8" />
                </span>
                <span className="font-mono text-sm text-blue-text">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">{s.nome}</h3>
              <p className="mt-2 text-muted">{s.resultado}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5" aria-label={`Exemplos de uso de ${s.nome}`}>
                {s.exemplos.map((ex) => (
                  <li key={ex} className="flex items-center gap-3">
                    <Cut className="h-4 w-3.5 shrink-0" />
                    {ex}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                <p className="font-mono text-sm text-muted">{priceLabel(s.precoCentavos)}</p>
                <ExternalLink href={external ? s.botaoLink : serviceWhatsappLink(s)} className={`${buttonPrimary} text-sm`}>
                  {external ? s.botaoTexto || "Ver mais" : "Pedir pelo WhatsApp"}
                </ExternalLink>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
