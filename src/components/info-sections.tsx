import type { CSSProperties } from "react";
import { depoimentos, empresa } from "@/lib/config";
import { formatPrice } from "@/lib/price";
import { buttonPrimary, Cut, Eyebrow, ExternalLink } from "./brand";
import { ServiceIcon } from "./icons";

export function HowItWorks() {
  if (empresa.etapas.length === 0) return null;
  return (
    <section id="como-funciona" aria-labelledby="como-titulo" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <Eyebrow>como funciona</Eyebrow>
      <h2 id="como-titulo" className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
        Do primeiro oi até o sistema no ar
      </h2>
      <div className="relative mt-10">
        <span className="draw absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-blue via-blue-text to-transparent lg:block" aria-hidden="true" />
        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {empresa.etapas.map((etapa, i) => (
            <li key={etapa.titulo} className="reveal card rounded-3xl p-6">
              <span className="grid size-14 place-items-center rounded-2xl bg-blue font-display text-2xl font-bold">{i + 1}</span>
              <h3 className="mt-5 font-display text-lg font-semibold">{etapa.titulo}</h3>
              <p className="mt-2 text-muted">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function NfcSection() {
  const { url, precoCentavos, modelos, descricao } = empresa.lojaNfc;
  return (
    <section id="plaquinhas" aria-labelledby="nfc-titulo" className="bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1fr_1.2fr] md:py-24">
        <div>
          <Eyebrow>plaquinhas NFC</Eyebrow>
          <h2 id="nfc-titulo" className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
            O cliente encosta o celular e pronto
          </h2>
          {descricao && <p className="mt-4 text-muted">{descricao}</p>}
          {precoCentavos != null && (
            <p className="mt-6 font-mono text-sm text-muted">A partir de {formatPrice(precoCentavos)}</p>
          )}
          {url && (
            <ExternalLink href={url} className={`${buttonPrimary} mt-6`}>
              Ver modelos na loja
            </ExternalLink>
          )}
        </div>
        <div>
          <NfcTap />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {modelos.map((m) => (
            <li key={m.nome} className="reveal card rounded-2xl bg-bg p-5">
              <div className="flex items-center gap-3">
                <ServiceIcon id="nfc" className="size-8" />
                <h3 className="font-display text-lg font-semibold">{m.nome}</h3>
              </div>
              <p className="mt-2 text-sm text-muted">{m.uso}</p>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const ringDelay = (i: number) => ({ "--i": i }) as CSSProperties;

/** Ilustração: celular encostando na plaquinha, com ondas de aproximação. */
function NfcTap() {
  return (
    <div className="relative grid h-44 place-items-center overflow-hidden rounded-3xl border border-line bg-bg" aria-hidden="true">
      <div className="glow absolute size-64 rounded-full" />
      {[0, 1, 2].map((i) => (
        <span key={i} style={ringDelay(i)} className="ring absolute size-28 rounded-full border-2 border-blue-text/60" />
      ))}
      <div className="relative flex items-center gap-6">
        <span className="grid h-20 w-28 place-items-center rounded-xl border border-line bg-surface">
          <ServiceIcon id="nfc" className="size-10" />
        </span>
        <span className="float h-24 w-12 rounded-xl border-2 border-ink/80 bg-surface" />
      </div>
    </div>
  );
}

export function Faq() {
  const items = empresa.faq.filter((f) => f.resposta !== "");
  if (items.length === 0) return null;
  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo" className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <Eyebrow>dúvidas</Eyebrow>
      <h2 id="duvidas-titulo" className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
        Perguntas frequentes
      </h2>
      <div className="mt-8 border-t border-line">
        {items.map((f) => (
          <details key={f.pergunta} className="group border-b border-line py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {f.pergunta}
              <Cut className="h-5 w-4 shrink-0 transition-transform group-open:rotate-90 motion-reduce:transition-none" />
            </summary>
            <p className="mt-3 text-muted">{f.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Só aparece com depoimento real e autorizado em config/empresa.json. */
export function Testimonials() {
  if (depoimentos.length === 0) return null;
  return (
    <section aria-labelledby="depoimentos-titulo" className="mx-auto max-w-6xl px-5 py-16">
      <h2 id="depoimentos-titulo" className="font-display text-3xl font-bold">
        Quem já usa
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {depoimentos.map((d) => (
          <li key={d.autor + d.texto}>
            <blockquote className="border-l-2 border-blue pl-4">
              <p>“{d.texto}”</p>
              <footer className="mt-2 text-sm text-muted">
                {d.autor}
                {d.negocio && `, ${d.negocio}`}
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}
