"use client";

import { useId, useRef, useState } from "react";
import { buildOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { buttonPrimary } from "./brand";

type Props = {
  phone: string;
  servicos: { id: string; nome: string; pedido: string }[];
  prazos: string[];
};

const DETAILS_MAX = 300;
const field =
  "mt-2 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/70 focus:border-blue-text";

/** Monta a mensagem e abre o WhatsApp. Nada é enviado para servidor nem guardado. */
export function OrderForm({ phone, servicos, prazos }: Props) {
  const id = useId();
  const firstCheck = useRef<HTMLInputElement>(null);
  const [needsService, setNeedsService] = useState(false);
  const [detailsLength, setDetailsLength] = useState(0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const chosen = data.getAll("servico").map(String);
    if (chosen.length === 0) {
      setNeedsService(true);
      firstCheck.current?.focus();
      return;
    }
    setNeedsService(false);
    const message = buildOrderMessage({
      nome: String(data.get("nome") ?? ""),
      negocio: String(data.get("negocio") ?? ""),
      segmento: String(data.get("segmento") ?? ""),
      servicos: servicos.filter((s) => chosen.includes(s.id)).map((s) => s.pedido),
      prazo: String(data.get("prazo") ?? ""),
      detalhes: String(data.get("detalhes") ?? ""),
    });
    const url = whatsappLink(phone, message);
    // Sem "noopener" nas features: com ele window.open sempre retorna null e o fallback também navegaria.
    const tab = window.open(url, "_blank");
    if (tab) tab.opener = null;
    else window.location.href = url;
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="card grid gap-6 rounded-3xl p-5 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="font-semibold">Seu nome</span>
          <input name="nome" required autoComplete="given-name" className={field} />
        </label>
        <label className="block">
          <span className="font-semibold">
            Nome do negócio <span className="font-normal text-muted">(opcional)</span>
          </span>
          <input name="negocio" autoComplete="organization" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className="font-semibold">
            Segmento <span className="font-normal text-muted">(opcional)</span>
          </span>
          <input name="segmento" placeholder="Ex.: barbearia, lanchonete, loja" className={field} />
        </label>
      </div>

      <fieldset aria-describedby={needsService ? `${id}-erro` : undefined}>
        <legend className="font-semibold">O que você precisa?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {servicos.map((s, i) => (
            <label
              key={s.id}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line bg-bg px-4 has-checked:border-blue-text"
            >
              <input
                ref={i === 0 ? firstCheck : undefined}
                type="checkbox"
                name="servico"
                value={s.id}
                onChange={() => setNeedsService(false)}
                className="size-5 accent-blue"
              />
              {s.nome}
            </label>
          ))}
        </div>
        {needsService && (
          <p id={`${id}-erro`} role="alert" className="mt-2 text-sm font-semibold text-blue-text">
            Escolha pelo menos um serviço.
          </p>
        )}
      </fieldset>

      <label className="block">
        <span className="font-semibold">
          Prazo desejado <span className="font-normal text-muted">(opcional)</span>
        </span>
        <select name="prazo" defaultValue="" className={field}>
          <option value="">Ainda não sei</option>
          {prazos.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="font-semibold">
          Conte um pouco mais <span className="font-normal text-muted">(opcional)</span>
        </span>
        <textarea
          name="detalhes"
          rows={4}
          maxLength={DETAILS_MAX}
          onChange={(e) => setDetailsLength(e.currentTarget.value.length)}
          aria-describedby={`${id}-contador`}
          className={field}
        />
        <span id={`${id}-contador`} className="mt-1 block text-right text-xs text-muted">
          {detailsLength}/{DETAILS_MAX}
        </span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className={buttonPrimary}>
          Montar mensagem e abrir o WhatsApp
        </button>
        <p className="text-sm text-muted">Nada é enviado nem guardado aqui: a mensagem só abre no seu WhatsApp.</p>
      </div>
    </form>
  );
}
