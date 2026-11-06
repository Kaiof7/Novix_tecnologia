# Arquitetura

## Visão geral
Next.js 16 (App Router) com React 19, Tailwind v4, TypeScript e Zod. O build é uma **exportação estática** (`output: "export"`) que gera HTML, CSS, JS e imagens em `out/`.

```
config/empresa.json ─┐
config/portfolio.json┴─> src/lib/config.ts (Zod valida no build) ─> componentes ─> out/
```

## Decisões
- **Estático, sem backend.** O site só apresenta e leva ao WhatsApp. Sem servidor, nada cai, nada precisa de manutenção e a hospedagem fica grátis. Qualquer host de arquivos serve (Vercel, Netlify, GitHub Pages).
- **Sem banco, sem formulário no servidor.** O "Montar pedido" monta a mensagem no navegador e abre `wa.me`. Nenhum dado pessoal sai do aparelho do visitante até ele tocar em enviar no WhatsApp.
- **Sem analytics e sem cookies.** Por isso não há banner de consentimento. Se um dia entrar analytics, atualize a página de privacidade.
- **Configuração em JSON + Zod.** O dono muda texto sem mexer em código. Um JSON inválido (telefone errado, URL sem https, descrição SEO fora de 50–160 caracteres) **quebra o build** em vez de ir torto para o ar.
- **Seções somem quando estão vazias.** Portfólio sem itens autorizados, depoimentos vazios, FAQ sem resposta e CNPJ vazio não aparecem. O menu acompanha.
- **`images.unoptimized`.** A exportação estática não tem otimizador de imagem. As capturas já saem em WebP com tamanho certo (`scripts/capture-portfolio.mjs`).
- **`cacheComponents` desligado.** Precisa do runtime Node e é incompatível com `output: "export"`.

## Pastas
- `src/app/`: rotas (`/`, `/privacidade`), layout, metadados, `sitemap.ts`, `robots.ts`, `manifest.ts` e ícones.
- `src/components/`: só apresentação.
  - `brand.tsx`: logo, corte azul, rótulos, link externo, classes de botão.
  - `layout-parts.tsx`: topo, rodapé, barra fixa do WhatsApp no celular.
  - Uma seção por arquivo nos demais.
  - `order-form.tsx` é o único componente cliente (`"use client"`).
- `src/lib/`: funções puras, todas testadas.
  - `whatsapp.ts`: telefone, mensagem do pedido, link.
  - `price.ts`: formatação em BRL.
  - `portfolio.ts`: filtro de itens autorizados.
  - `seo.ts`: JSON-LD.
  - `contrast.ts` e `palette.ts`: cores e contraste WCAG.
  - `config-schema.ts` e `config.ts`: carregam e validam os JSON.
- `scripts/`:
  - `capture-portfolio.mjs`: capturas reais via Chrome headless + sharp.
  - `brand-assets.mjs`: `apple-icon.png` e `og.png`.
- `eslint-rules/`: regras do Vibe Coding Toolkit (perfil leve).

## Segurança
- Links externos usam `target="_blank" rel="noopener noreferrer"`.
- O JSON-LD é serializado com `<` escapado, para não fechar o `<script>`.
- O `window.open` do formulário zera `opener`.
- Sem segredos no repositório: o site não usa nenhuma chave.
