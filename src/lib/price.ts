const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Centavos inteiros em reais ("R$ 50,00", com U+00A0). Sem preço: "sob orçamento". */
export function formatPrice(cents: number | null | undefined): string {
  if (cents == null) return "sob orçamento";
  return brl.format(cents / 100);
}
