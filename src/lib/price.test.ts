import { describe, expect, it } from "vitest";
import { formatPrice } from "./price";

const NBSP = " ";

describe("formatPrice", () => {
  it("formata centavos inteiros em reais com espaço não separável", () => {
    expect(formatPrice(5000)).toBe(`R$${NBSP}50,00`);
    expect(formatPrice(4000)).toBe(`R$${NBSP}40,00`);
    expect(formatPrice(123456)).toBe(`R$${NBSP}1.234,56`);
  });

  it("preço vazio vira 'sob orçamento'", () => {
    expect(formatPrice(null)).toBe("sob orçamento");
    expect(formatPrice(undefined)).toBe("sob orçamento");
  });
});
