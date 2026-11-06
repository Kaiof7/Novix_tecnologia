import type { CSSProperties } from "react";
import { empresa } from "@/lib/config";
import { Symbol } from "./brand";
import { ServiceIcon } from "./icons";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Celular ilustrativo com os destaques do config. Decorativo: o mesmo conteúdo está no texto da página. */
export function HeroVisual() {
  const { destaques } = empresa;
  return (
    <div className="relative mx-auto w-full max-w-[22rem]" aria-hidden="true">
      <div className="glow absolute inset-0 rounded-full md:-inset-10" />
      {destaques.length === 0 ? (
        <Symbol className="relative mx-auto size-72 lg:size-80" />
      ) : (
        <div className="float relative">
          <div className="rounded-[2.25rem] border border-line bg-bg/80 p-3 shadow-[0_40px_80px_-40px_rgb(31_91_255/0.6)] backdrop-blur-sm">
            <div className="rounded-[1.75rem] border border-line bg-surface px-4 pb-6 pt-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Symbol bg="#1A1D24" className="size-7" />
                  <span className="font-display text-sm font-semibold">novix</span>
                </span>
                <span className="h-1.5 w-12 rounded-full bg-line" />
              </div>
              <ul className="mt-5 space-y-3">
                {destaques.map((d, i) => (
                  <li key={d.titulo} style={order(i)} className="pop card flex items-start gap-3 rounded-2xl p-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue/15">
                      <ServiceIcon id={d.servico} className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-tight">{d.titulo}</span>
                      <span className="mt-1 block text-sm text-muted">{d.texto}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2">
                <span className="pop h-2 flex-1 rounded-full bg-blue" style={order(destaques.length)} />
                <span className="h-2 w-1/4 rounded-full bg-line" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
