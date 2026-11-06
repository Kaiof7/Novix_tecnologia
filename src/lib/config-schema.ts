import { z } from "zod";
import { normalizePhone } from "./whatsapp";

/** Texto opcional: "" esconde o elemento no site. */
const optionalText = z.string().trim();
const optionalUrl = z.union([z.literal(""), z.url({ protocol: /^https$/ })]);
const cents = z.number().int().nonnegative().nullable();

const phone = z.string().transform((value, ctx) => {
  try {
    return normalizePhone(value);
  } catch (error) {
    ctx.addIssue({ code: "custom", message: (error as Error).message });
    return z.NEVER;
  }
});

const servico = z.object({
  id: z.string().regex(/^[a-z-]+$/),
  nome: z.string().min(1),
  resultado: z.string().min(1),
  exemplos: z.array(z.string().min(1)).length(3),
  /** Frase com artigo usada no formulário: "Quero <pedido>." */
  pedido: z.string().min(1),
  mensagem: z.string().min(1),
  precoCentavos: cents,
  /** Link externo opcional do botão (ex.: loja das plaquinhas). Vazio = abre o WhatsApp. */
  botaoLink: optionalUrl,
  botaoTexto: optionalText,
});

/** Cartões ilustrativos do topo: mostram o resultado de um serviço. */
const destaque = z.object({ servico: z.string(), titulo: z.string().min(1), texto: z.string().min(1) });

export const empresaSchema = z
  .object({
  nome: z.string().min(1),
  frase: z.string().min(1),
  fraseApoio: z.string().min(1),
  resultado: z.string().min(1),
  whatsapp: phone,
  whatsappExibicao: optionalText,
  mensagemPadrao: z.string().min(1),
  email: z.union([z.literal(""), z.email()]),
  area: optionalText,
  cidade: optionalText,
  uf: optionalText,
  cnpj: optionalText,
  instagram: optionalUrl,
  siteUrl: z.url({ protocol: /^https$/ }),
  seoTitulo: z.string().min(1),
  seoDescricao: z.string().min(50).max(160),
  lojaNfc: z.object({
    url: optionalUrl,
    descricao: optionalText,
    precoCentavos: cents,
    /** Data (AAAA-MM-DD) em que o preço foi conferido na loja. */
    conferidoEm: z.iso.date().or(z.literal("")),
    modelos: z.array(z.object({ nome: z.string().min(1), uso: z.string().min(1) })),
  }),
  servicos: z.array(servico).min(1),
  etapas: z.array(z.object({ titulo: z.string().min(1), texto: z.string().min(1) })),
  prazos: z.array(z.string().min(1)),
  faq: z.array(z.object({ pergunta: z.string().min(1), resposta: optionalText })),
  depoimentos: z.array(z.object({ texto: z.string().min(1), autor: z.string().min(1), negocio: optionalText })),
  destaques: z.array(destaque).max(3),
})
  .superRefine((e, ctx) => {
    const ids = new Set(e.servicos.map((s) => s.id));
    e.destaques.forEach((d, i) => {
      if (!ids.has(d.servico)) {
        ctx.addIssue({ code: "custom", path: ["destaques", i, "servico"], message: `serviço "${d.servico}" não existe` });
      }
    });
  });

export const portfolioSchema = z.array(
  z.object({
    nome: z.string().min(1),
    segmento: z.string().min(1),
    resolve: z.string().min(1),
    link: optionalUrl,
    /** Captura real em 1440px (WebP em public/portfolio). */
    capa: z.string().startsWith("/portfolio/"),
    /** Captura real em 375px. */
    capaMobile: z.union([z.literal(""), z.string().startsWith("/portfolio/")]),
    autorizado: z.boolean(),
  }),
);

export type Empresa = z.infer<typeof empresaSchema>;
export type Servico = Empresa["servicos"][number];
export type PortfolioItem = z.infer<typeof portfolioSchema>[number];
