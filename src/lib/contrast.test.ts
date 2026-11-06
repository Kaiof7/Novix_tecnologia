import { describe, expect, it } from "vitest";
import { contrastRatio } from "./contrast";
import { palette } from "./palette";

describe("contrastRatio", () => {
  it("bate com as referências do PRODUCT.md", () => {
    expect(contrastRatio("#FFFFFF", "#121318")).toBe(18.55);
    expect(contrastRatio("#FFFFFF", "#2160FF")).toBe(5.02);
    expect(contrastRatio("#2160FF", "#121318")).toBe(3.69);
    expect(contrastRatio("#5B8CFF", "#121318")).toBe(5.87);
  });
});

describe("paleta do site (WCAG AA, texto pequeno ≥ 4.5)", () => {
  const pairs: [string, string, string][] = [
    ["texto", palette.text, palette.bg],
    ["texto secundário", palette.muted, palette.bg],
    ["texto secundário no card", palette.muted, palette.surface],
    ["azul de texto", palette.blueText, palette.bg],
    ["azul de texto no card", palette.blueText, palette.surface],
    ["texto do botão azul", palette.text, palette.blue],
  ];
  it.each(pairs)("%s", (_, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("azul da marca como texto pequeno reprova e só é usado em elementos grandes", () => {
    expect(contrastRatio(palette.blue, palette.bg)).toBeLessThan(4.5);
  });
});
