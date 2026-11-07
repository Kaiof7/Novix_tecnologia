import { Cut, CutDivider, Eyebrow } from "@/components/brand";
import { Hero } from "@/components/hero";
import { Faq, HowItWorks, NfcSection, Testimonials } from "@/components/info-sections";
import { OrderForm } from "@/components/order-form";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { empresa } from "@/lib/config";
import { buildJsonLd } from "@/lib/seo";

export default function Home() {
  const jsonLd = JSON.stringify(buildJsonLd(empresa)).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Hero />
      <CutDivider />
      <Services />
      <Portfolio />
      <CutDivider />
      <HowItWorks />
      <section id="pedido" aria-labelledby="pedido-titulo" className="relative overflow-hidden">
        <div className="glow pointer-events-none absolute -left-40 top-20 size-[32rem] rounded-full" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>montar pedido</Eyebrow>
            <h2 id="pedido-titulo" className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
              Diga o que precisa e a mensagem sai pronta
            </h2>
            <p className="mt-4 text-muted">Preencha o que souber. O WhatsApp abre com o texto montado para você só enviar.</p>
            <ul className="mt-8 hidden space-y-4 lg:block">
              {["Leva menos de 1 minuto", "Você vê a mensagem antes de enviar", "Nada fica guardado no site"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Cut className="h-4 w-3.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <OrderForm
            phone={empresa.whatsapp}
            servicos={empresa.servicos.map(({ id, nome, pedido }) => ({ id, nome, pedido }))}
            prazos={empresa.prazos}
          />
        </div>
      </section>
      <NfcSection />
      <Testimonials />
      <Faq />
    </>
  );
}
