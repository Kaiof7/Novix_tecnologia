import { describe, expect, it } from "vitest";
import empresaJson from "../../config/empresa.json";
import portfolioJson from "../../config/portfolio.json";
import { empresaSchema, portfolioSchema } from "./config-schema";

describe("config", () => {
  it("os arquivos reais de config são válidos", () => {
    const empresa = empresaSchema.parse(empresaJson);
    expect(empresa.whatsapp).toBe("5583991153515");
    expect(empresa.servicos).toHaveLength(5);
    expect(() => portfolioSchema.parse(portfolioJson)).not.toThrow();
  });

  it("número de WhatsApp inválido quebra a validação (e o build)", () => {
    expect(() => empresaSchema.parse({ ...empresaJson, whatsapp: "9115-3515" })).toThrow();
  });

  it("aceita campos opcionais vazios", () => {
    const empresa = empresaSchema.parse({ ...empresaJson, cnpj: "", email: "", instagram: "" });
    expect(empresa.cnpj).toBe("");
    expect(empresa.instagram).toBe("");
  });

  it("rejeita link que não é URL", () => {
    expect(() => empresaSchema.parse({ ...empresaJson, instagram: "novix_tecnologia" })).toThrow();
  });
});

describe("destaques do topo", () => {
  it("cada destaque aponta para um serviço que existe", () => {
    const destaques = [{ servico: "nao-existe", titulo: "Teste", texto: "Teste" }];
    expect(() => empresaSchema.parse({ ...empresaJson, destaques })).toThrow(/serviço/);
  });

  it("aceita lista vazia (o topo mostra só o símbolo)", () => {
    expect(empresaSchema.parse({ ...empresaJson, destaques: [] }).destaques).toEqual([]);
  });
});
