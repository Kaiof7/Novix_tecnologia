"use client";

import { useId, useRef, useState } from "react";
import { buildOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { buttonPrimary } from "./brand";
import { ServiceIcon } from "./icons";

type Props = {
  phone: string;
  servicos: { id: string; nome: string; pedido: string }[];
  prazos: string[];
};

const DETAILS_MAX = 300;
const field =
  "mt-2 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink transition-colors placeholder:text-muted/70 hover:border-white/25 focus:border-blue-text";
const pill =
  "flex min-h-11 cursor-pointer items-center rounded-full border border-line bg-bg px-4 text-sm transition-colors hover:border-white/25 has-checked:border-blue-text has-checked:bg-blue/15 has-focus-visible:outline-3 has-focus-visible:outline-blue-text";

function Step({ n, title, hint }: { n: number; title: string; hint?: string }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue font-display text-sm font-bold">{n}</span>
      <span className="font-display text-lg font-semibold">{title}</span>
      {hint && <span className="text-sm text-muted">{hint}</span>}
    </span>
  );
}

/** Monta a mensagem e abre o WhatsApp. Nada é enviado para servidor nem guardado. */
export function OrderForm({ phone, servicos, prazos }: Props) {
  const id = useId();
  const firstCheck = useRef<HTMLInputElement>(null);
  const [needsService, setNeedsService] = useState(false);
  const [detailsLength, setDetailsLength] = useState(0);
  const [preview, setPreview] = useState(() => buildOrderMessage({}));

  function messageFrom(form: HTMLFormElement) {
    const data = new FormData(form);
    const chosen = data.getAll("servico").map(String);
    const message = buildOrderMessage({
      nome: String(data.get("nome") ?? ""),
      negocio: String(data.get("negocio") ?? ""),
      segmento: String(data.get("segmento") ?? ""),
      servicos: servicos.filter((s) => chosen.includes(s.id)).map((s) => s.pedido),
      prazo: String(data.get("prazo") ?? ""),
      detalhes: String(data.get("detalhes") ?? ""),
    });
    return { chosen, message };
  }

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    const { chosen, message } = messageFrom(event.currentTarget);
    setPreview(message);
    if (chosen.length > 0) setNeedsService(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { chosen, message } = messageFrom(event.currentTarget);
    if (chosen.length === 0) {
      setNeedsService(true);
      firstCheck.current?.focus();
      return;
    }
    setNeedsService(false);
    const url = whatsappLink(phone, message);
    // Sem "noopener" nas features: com ele window.open sempre retorna null e o fallback também navegaria.
    const tab = window.open(url, "_blank");
    if (tab) tab.opener = null;
    else window.location.href = url;
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange} className="card grid gap-8 rounded-3xl p-5 sm:p-8">
      <fieldset className="grid gap-5">
        <legend className="mb-5">
          <Step n={1} title="Sobre você" />
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Seu nome</span>
            <input name="nome" required autoComplete="given-name" placeholder="Ex.: Ana" className={field} />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">
              Nome do negócio <span className="font-normal text-muted">(opcional)</span>
            </span>
            <input name="negocio" autoComplete="organization" placeholder="Ex.: Barbearia Corte Fino" className={field} />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-semibold">
            Segmento <span className="font-normal text-muted">(opcional)</span>
          </span>
          <input name="segmento" placeholder="Ex.: barbearia, lanchonete, loja" className={field} />
        </label>
      </fieldset>

      <fieldset aria-describedby={needsService ? `${id}-erro` : undefined}>
        <legend className="mb-4">
          <Step n={2} title="O que você precisa?" />
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {servicos.map((s, i) => (
            <label
              key={s.id}
              className="group flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-line bg-bg px-4 py-3 transition-colors hover:border-white/25 has-checked:border-blue-text has-checked:bg-blue/10 has-focus-visible:outline-3 has-focus-visible:outline-blue-text"
            >
              <input
                ref={i === 0 ? firstCheck : undefined}
                type="checkbox"
                name="servico"
                value={s.id}
                className="peer sr-only"
              />
              <ServiceIcon id={s.id} className="size-7 shrink-0" />
              <span className="flex-1 font-semibold leading-tight">{s.nome}</span>
              <span
                aria-hidden="true"
                className="grid size-6 shrink-0 place-items-center rounded-md border border-line text-transparent transition-colors peer-checked:border-blue peer-checked:bg-blue peer-checked:text-ink"
              >
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </label>
          ))}
        </div>
        {needsService && (
          <p id={`${id}-erro`} role="alert" className="mt-3 text-sm font-semibold text-blue-text">
            Escolha pelo menos um serviço.
          </p>
        )}
      </fieldset>

      <fieldset className="grid gap-5">
        <legend className="mb-5">
          <Step n={3} title="Detalhes" hint="(opcional)" />
        </legend>
        <div role="radiogroup" aria-label="Prazo desejado">
          <span className="text-sm font-semibold">Prazo desejado</span>
          <div className="mt-2 flex flex-wrap gap-2">
            <label className={pill}>
              <input type="radio" name="prazo" value="" defaultChecked className="sr-only" />
              Ainda não sei
            </label>
            {prazos.map((p) => (
              <label key={p} className={pill}>
                <input type="radio" name="prazo" value={p} className="sr-only" />
                {p}
              </label>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="text-sm font-semibold">Conte um pouco mais</span>
          <textarea
            name="detalhes"
            rows={3}
            maxLength={DETAILS_MAX}
            placeholder="Ex.: quero que o cliente marque horário pelo celular"
            onChange={(e) => setDetailsLength(e.currentTarget.value.length)}
            aria-describedby={`${id}-contador`}
            className={field}
          />
          <span id={`${id}-contador`} className="mt-1 block text-right text-xs text-muted">
            {detailsLength}/{DETAILS_MAX}
          </span>
        </label>
      </fieldset>

      <div className="rounded-2xl border border-line bg-bg p-4 sm:p-5">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Prévia da mensagem</p>
        <p aria-live="polite" className="mt-3 max-w-prose rounded-2xl rounded-tl-sm bg-blue/15 px-4 py-3 leading-relaxed">
          {preview}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className={`${buttonPrimary} sm:px-8`}>
          Montar mensagem e abrir o WhatsApp
        </button>
        <p className="text-sm text-muted">Nada é enviado nem guardado aqui: a mensagem só abre no seu WhatsApp.</p>
      </div>
    </form>
  );
}
