<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Regras do projeto (site da Novix)

- Leia `PRODUCT.md` antes de mudar escopo e `docs/` antes de mudar arquitetura ou visual.
- Nenhum dado da empresa no código: textos, contatos, preços e links ficam em `config/*.json`, validados por `src/lib/config-schema.ts`.
- Lógica só em funções puras de `src/lib/` com teste ao lado (`*.test.ts`). Componentes só exibem.
- Site estático (`output: "export"`): nada que exija servidor (rotas de API, cookies, `cacheComponents`).
- Máximo de 350 linhas por arquivo (regra do ESLint).
- Contraste: texto pequeno em azul usa `blue-text` (#4D7DFF), nunca `blue` (#1F5BFF). Veja docs/design.md.
- Portfólio: só entra com `autorizado: true` e link preenchido. A autorização é do cliente, por escrito.
- Antes de entregar: `npm run check`, além da validação no navegador descrita em docs/quality.md.
- Não publique sem autorização explícita do dono.
