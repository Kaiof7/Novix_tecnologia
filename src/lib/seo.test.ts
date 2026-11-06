import { describe, expect, it } from "vitest";
import empresaJson from "../../config/empresa.json";
import { empresaSchema } from "./config-schema";
import { buildJsonLd } from "./seo";

const empresa = empresaSchema.parse(empresaJson);

describe("buildJsonLd", () => {
  it("gera Organization e LocalBusiness com telefone normalizado", () => {
    const ld = buildJsonLd(empresa);
    const types = ld["@graph"].map((n) => n["@type"]);
    expect(types).toEqual(["Organization", "LocalBusiness"]);
    expect(ld["@graph"][1].telephone).toBe("+5583991153515");
  });

  it("não leva campo vazio (CNPJ em branco some)", () => {
    const json = JSON.stringify(buildJsonLd({ ...empresa, cnpj: "", instagram: "" }));
    expect(json).not.toContain('""');
    expect(json).not.toContain("taxID");
    expect(json).not.toContain("sameAs");
  });
});
