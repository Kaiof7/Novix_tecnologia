import empresaJson from "../../config/empresa.json";
import portfolioJson from "../../config/portfolio.json";
import { empresaSchema, portfolioSchema, type Servico } from "./config-schema";
import { visiblePortfolio } from "./portfolio";
import { whatsappLink } from "./whatsapp";

// Validado no build: config inválido derruba o `next build` em vez de gerar link quebrado.
export const empresa = empresaSchema.parse(empresaJson);
export const portfolio = visiblePortfolio(portfolioSchema.parse(portfolioJson));
export const depoimentos = empresa.depoimentos;

export const defaultWhatsappLink = whatsappLink(empresa.whatsapp, empresa.mensagemPadrao);

export function serviceWhatsappLink(servico: Servico): string {
  return whatsappLink(empresa.whatsapp, servico.mensagem);
}
