import { CutDivider, Eyebrow } from "@/components/brand";
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
      <section id="pedido" aria-labelledby="pedido-titulo" className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <Eyebrow>montar pedido</Eyebrow>
        <h2 id="pedido-titulo" className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
          Diga o que precisa e a mensagem sai pronta
        </h2>
        <p className="mt-3 mb-8 text-muted">Preencha o que souber. O WhatsApp abre com o texto montado para você só enviar.</p>
        <OrderForm
          phone={empresa.whatsapp}
          servicos={empresa.servicos.map(({ id, nome, pedido }) => ({ id, nome, pedido }))}
          prazos={empresa.prazos}
        />
      </section>
      <NfcSection />
      <Testimonials />
      <Faq />
    </>
  );
}
