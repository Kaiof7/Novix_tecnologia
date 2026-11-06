import { describe, expect, it } from "vitest";
import { buildOrderMessage, joinList, normalizePhone, whatsappLink } from "./whatsapp";

describe("normalizePhone", () => {
  it("adiciona o 55 a números formatados ou só com dígitos", () => {
    expect(normalizePhone("(83) 9 9115-3515")).toBe("5583991153515");
    expect(normalizePhone("83991153515")).toBe("5583991153515");
  });

  it("mantém número que já tem o código do país", () => {
    expect(normalizePhone("5583991153515")).toBe("5583991153515");
    expect(normalizePhone("+55 83 3333-4444")).toBe("558333334444");
  });

  it("rejeita número com menos de 12 ou mais de 13 dígitos depois de normalizar", () => {
    expect(() => normalizePhone("9115-3515")).toThrow();
    expect(() => normalizePhone("55839911535150")).toThrow();
    expect(() => normalizePhone("")).toThrow();
  });
});

describe("joinList", () => {
  it("separa por vírgula e usa 'e' no último", () => {
    expect(joinList([])).toBe("");
    expect(joinList(["um site"])).toBe("um site");
    expect(joinList(["um site", "automação"])).toBe("um site e automação");
    expect(joinList(["um site", "automação", "plaquinhas NFC"])).toBe("um site, automação e plaquinhas NFC");
  });
});

describe("buildOrderMessage", () => {
  it("monta a mensagem do exemplo completo", () => {
    const msg = buildOrderMessage({
      nome: "Ana",
      negocio: "Barbearia Corte Fino",
      servicos: ["um sistema de agendamento"],
      prazo: "até 30 dias",
    });
    expect(msg).toBe("Olá! Sou Ana. Negócio: Barbearia Corte Fino. Quero um sistema de agendamento. Prazo: até 30 dias.");
    expect(whatsappLink("5583991153515", msg)).toBe(
      "https://wa.me/5583991153515?text=Ol%C3%A1!%20Sou%20Ana.%20Neg%C3%B3cio%3A%20Barbearia%20Corte%20Fino.%20Quero%20um%20sistema%20de%20agendamento.%20Prazo%3A%20at%C3%A9%2030%20dias.",
    );
  });

  it("lista vários serviços com vírgula e 'e'", () => {
    const msg = buildOrderMessage({ nome: "Ana", servicos: ["um site", "automação", "plaquinhas NFC"] });
    expect(msg).toBe("Olá! Sou Ana. Quero um site, automação e plaquinhas NFC.");
  });

  it("tira da frase os campos vazios, sem pontuação sobrando", () => {
    expect(buildOrderMessage({ nome: " ", negocio: "", servicos: [], prazo: "" })).toBe("Olá!");
    expect(buildOrderMessage({ negocio: "Lanchonete do Zé", prazo: "" })).toBe("Olá! Negócio: Lanchonete do Zé.");
    expect(buildOrderMessage({ nome: "Zé", negocio: "Mercadinho do Zé" })).toBe("Olá! Sou Zé. Negócio: Mercadinho do Zé.");
    expect(buildOrderMessage({ nome: "Ana", prazo: "até 30 dias" })).toBe("Olá! Sou Ana. Prazo: até 30 dias.");
    expect(buildOrderMessage({ nome: "Ana" })).not.toMatch(/Prazo|,\s*\.|\.\./);
  });

  it("corta o campo livre em 300 caracteres e junta quebras de linha repetidas", () => {
    const msg = buildOrderMessage({ nome: "Ana", detalhes: `linha 1\n\n\n\r\nlinha 2  ${"x".repeat(400)}` });
    const detalhes = msg.split("Detalhes: ")[1];
    expect(detalhes.startsWith("linha 1\nlinha 2")).toBe(true);
    expect(detalhes.length).toBe(300);
  });

  it("inclui o segmento quando preenchido", () => {
    expect(buildOrderMessage({ nome: "Ana", segmento: "barbearia", servicos: ["um site"] })).toBe(
      "Olá! Sou Ana. Segmento: barbearia. Quero um site.",
    );
  });

  it("ignora campo livre só com espaços", () => {
    expect(buildOrderMessage({ nome: "Ana", detalhes: " \n\n " })).toBe("Olá! Sou Ana.");
  });
});

describe("whatsappLink", () => {
  it("codifica a mensagem com encodeURIComponent", () => {
    expect(whatsappLink("5583991153515", "Oi & tchau?")).toBe("https://wa.me/5583991153515?text=Oi%20%26%20tchau%3F");
  });
});
