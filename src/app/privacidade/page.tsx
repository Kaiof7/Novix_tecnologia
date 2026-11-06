import type { Metadata } from "next";
import { empresa } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacidade",
  description: `Como o site da ${empresa.nome} trata os seus dados: sem cookies, sem analytics e sem guardar o formulário.`,
  alternates: { canonical: "/privacidade" },
};

export default function Privacidade() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-16 md:py-24">
      <h1 className="font-display text-4xl font-bold tracking-[-0.02em]">Privacidade</h1>
      <div className="mt-8 space-y-5 text-muted">
        <p>
          Este site não usa cookies, não tem ferramentas de análise de terceiros e não guarda nenhum dado que você
          digita.
        </p>
        <p>
          O formulário “Montar pedido” só monta um texto no seu próprio navegador. Ao tocar no botão, o WhatsApp abre
          com essa mensagem e é você quem decide enviar. Nada passa por um servidor da {empresa.nome}.
        </p>
        <p>
          Quando você conversa pelo WhatsApp, a mensagem segue as regras de privacidade do próprio WhatsApp. Os dados
          que você mandar ali são usados só para responder e preparar a sua proposta.
        </p>
        {empresa.email && (
          <p>
            Para pedir que alguma conversa seja apagada, escreva para{" "}
            <a href={`mailto:${empresa.email}`} className="text-blue-text underline underline-offset-4">
              {empresa.email}
            </a>
            .
          </p>
        )}
      </div>
    </article>
  );
}
