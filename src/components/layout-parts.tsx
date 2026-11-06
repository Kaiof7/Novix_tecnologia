import Link from "next/link";
import { defaultWhatsappLink, empresa, portfolio } from "@/lib/config";
import { buttonPrimary, ExternalLink, Logo } from "./brand";

const nav = [
  { href: "/#servicos", label: "Serviços", show: true },
  { href: "/#trabalhos", label: "Trabalhos", show: portfolio.length > 0 },
  { href: "/#como-funciona", label: "Como funciona", show: empresa.etapas.length > 0 },
  { href: "/#pedido", label: "Montar pedido", show: true },
  { href: "/#duvidas", label: "Dúvidas", show: empresa.faq.length > 0 },
].filter((item) => item.show);

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" aria-label={`${empresa.nome}, página inicial`}>
          <Logo name={empresa.nome} />
        </Link>
        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex gap-6 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-11 items-center hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Wrapper porque buttonPrimary já traz inline-flex, que anula o hidden. No celular a barra fixa cumpre esse papel. */}
        <div className="hidden md:block">
          <ExternalLink href={defaultWhatsappLink} className={`${buttonPrimary} min-h-10 px-5 text-sm`}>
            Falar no WhatsApp
          </ExternalLink>
        </div>
      </div>
    </header>
  );
}

/** Barra fixa no celular: o WhatsApp sempre ao alcance do polegar. */
export function WhatsAppBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 p-3 backdrop-blur-sm md:hidden">
      <ExternalLink href={defaultWhatsappLink} className={`${buttonPrimary} w-full`}>
        Falar no WhatsApp
      </ExternalLink>
    </div>
  );
}

export function Footer() {
  const { whatsappExibicao, email, instagram, area, cnpj, nome } = empresa;
  return (
    <footer className="border-t border-line pb-28 pt-12 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-3">
        <div className="space-y-3">
          <Logo name={nome} />
          {area && <p className="text-sm text-muted">Atendimento em {area}.</p>}
          {cnpj && <p className="text-sm text-muted">CNPJ {cnpj}</p>}
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold">Contato</h2>
          <ul className="mt-1 text-sm text-muted">
            <li>
              <ExternalLink href={defaultWhatsappLink} className="inline-flex min-h-11 items-center hover:text-ink">
                WhatsApp {whatsappExibicao}
              </ExternalLink>
            </li>
            {email && (
              <li>
                <a href={`mailto:${email}`} className="inline-flex min-h-11 items-center hover:text-ink">
                  {email}
                </a>
              </li>
            )}
            {instagram && (
              <li>
                <ExternalLink href={instagram} className="inline-flex min-h-11 items-center hover:text-ink">
                  Instagram
                </ExternalLink>
              </li>
            )}
          </ul>
        </div>
        <div className="text-sm text-muted md:text-right">
          <Link href="/privacidade" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-ink">
            Privacidade
          </Link>
          <p className="mt-3">
            © {new Date().getFullYear()} {nome}
          </p>
        </div>
      </div>
    </footer>
  );
}
