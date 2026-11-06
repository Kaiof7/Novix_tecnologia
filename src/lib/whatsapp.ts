const DETAILS_MAX = 300;

/** Só dígitos, com o código do Brasil (55). Lança erro fora de 12 ou 13 dígitos. */
export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) digits = `55${digits}`;
  if (digits.length < 12 || digits.length > 13) {
    throw new Error(`Número de WhatsApp inválido: "${raw}" (${digits.length} dígitos após normalizar)`);
  }
  return digits;
}

/** "a", "a e b", "a, b e c". */
export function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

export type OrderInput = {
  nome?: string;
  negocio?: string;
  segmento?: string;
  /** Frases com artigo, vindas do config (ex.: "um sistema de agendamento"). */
  servicos?: string[];
  prazo?: string;
  detalhes?: string;
};

function cleanDetails(text: string): string {
  return text
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]*\n[\s]*\n[\s]*/g, "\n")
    .trim()
    .slice(0, DETAILS_MAX);
}

export function buildOrderMessage(input: OrderInput): string {
  const nome = input.nome?.trim() ?? "";
  const negocio = input.negocio?.trim() ?? "";
  const segmento = input.segmento?.trim() ?? "";
  const servicos = (input.servicos ?? []).map((s) => s.trim()).filter(Boolean);
  const prazo = input.prazo?.trim() ?? "";
  const detalhes = cleanDetails(input.detalhes ?? "");

  const parts = ["Olá!"];
  if (nome) parts.push(`Sou ${nome}.`);
  // "Negócio:" em vez de "da/do": o gênero do nome do negócio é desconhecido.
  if (negocio) parts.push(`Negócio: ${negocio}.`);
  if (segmento) parts.push(`Segmento: ${segmento}.`);
  if (servicos.length) parts.push(`Quero ${joinList(servicos)}.`);
  if (prazo) parts.push(`Prazo: ${prazo}.`);
  if (detalhes) parts.push(`Detalhes: ${detalhes}`);
  return parts.join(" ");
}

export function whatsappLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
