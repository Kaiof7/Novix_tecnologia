import Image from "next/image";
import { portfolio } from "@/lib/config";
import { Eyebrow, ExternalLink } from "./brand";

/** Some inteira se nenhum trabalho tiver link e autorização do cliente. */
export function Portfolio() {
  if (portfolio.length === 0) return null;
  return (
    <section id="trabalhos" aria-labelledby="trabalhos-titulo" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <Eyebrow>trabalhos</Eyebrow>
      <h2 id="trabalhos-titulo" className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
        Trabalhos no ar
      </h2>
      <ul className="mt-10 grid gap-10 md:grid-cols-2">
        {portfolio.map((item) => (
          <li key={item.link} className="reveal card flex flex-col rounded-3xl p-4">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-bg">
              <div className="flex h-8 items-center gap-1.5 border-b border-line px-3" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
              </div>
              <Image
                src={item.capa}
                alt={`Captura da tela de ${item.nome} no computador`}
                width={1200}
                height={750}
                className="h-auto w-full"
              />
              {item.capaMobile && (
                <Image
                  src={item.capaMobile}
                  alt={`Captura da tela de ${item.nome} no celular`}
                  width={375}
                  height={760}
                  className="absolute bottom-3 right-3 h-auto w-[22%] rounded-lg border-2 border-bg"
                />
              )}
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">{item.segmento}</p>
            <h3 className="mt-1 font-display text-xl font-semibold">{item.nome}</h3>
            <p className="mt-2 text-muted">{item.resolve}</p>
            <ExternalLink href={item.link} className="mt-3 font-semibold text-blue-text underline underline-offset-4">
              Ver ao vivo
            </ExternalLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
