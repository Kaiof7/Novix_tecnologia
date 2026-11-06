import { describe, expect, it } from "vitest";
import { visiblePortfolio } from "./portfolio";

const base = { nome: "Site", segmento: "Lanchonete", resolve: "Cardápio", capa: "/portfolio/x-1440.webp", capaMobile: "" };

describe("visiblePortfolio", () => {
  it("mostra só itens com link e autorização", () => {
    const items = [
      { ...base, nome: "ok", link: "https://a.vercel.app", autorizado: true },
      { ...base, nome: "sem link", link: "", autorizado: true },
      { ...base, nome: "sem autorização", link: "https://b.vercel.app", autorizado: false },
    ];
    expect(visiblePortfolio(items).map((i) => i.nome)).toEqual(["ok"]);
  });

  it("lista vazia quando nada pode aparecer", () => {
    expect(visiblePortfolio([{ ...base, link: "https://a.vercel.app", autorizado: false }])).toEqual([]);
  });
});
