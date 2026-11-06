# Qualidade

## Checagens automáticas
`npm run check` roda tudo em sequência:
1. `npm run lint`: ESLint, perfil leve do Vibe Coding Toolkit (`eslint-rules/`, máximo de 350 linhas por arquivo).
2. `npm run lint:typed`: regras com tipo (`no-floating-promises`, `no-misused-promises`).
3. `npm run typecheck`: `next typegen` e depois `tsc --noEmit`.
4. `npm test`: Vitest, com testes das funções de `src/lib/`.
5. `npm run build`: exportação estática. A validação Zod dos JSON também roda aqui.

`npm run lint:rules` confere se as regras customizadas do toolkit continuam funcionando.

## Validação no navegador (antes de publicar)
1. Rode `npm run build` e depois `npx serve out -l 4310`.
2. Faça a varredura: `node ~/.claude/skills/validate-app/scripts/run-routes.mjs .claude/validation/routes.json`. Ela cobre `/` e `/privacidade` em 1440, 375 e 360px.
3. Abra os screenshots em `.claude/validation/out/` e confira a página visualmente. Os cartões com `.reveal` só aparecem depois de rolar, então confira cada seção rolando até ela (agent-browser `scrollIntoView` + screenshot). Teste também com "reduzir movimento" (`agent-browser set media reduced-motion`): tudo deve aparecer parado.
4. Teste o formulário em três situações:
   - só o nome, que deve mostrar "Escolha pelo menos um serviço.";
   - nome e um serviço;
   - todos os campos.
5. Confira o texto da mensagem e o número no link `wa.me`.
6. Confira cada botão de serviço, o link da loja e os links do portfólio.
7. Rode o Lighthouse mobile (`npx lighthouse http://localhost:4310/ --form-factor=mobile`). A meta é ≥90 nas quatro categorias.

## Última validação (05/11/2026, depois dos cartões animados)
- Lighthouse mobile: desempenho 100, acessibilidade 100, boas práticas 100, SEO 100 (LCP 0,8 s, CLS 0).
  - O aviso de cache vem do `serve` local; a Vercel envia cabeçalhos de cache.
- Varredura: 6/6 OK, sem scroll horizontal e sem erro de JS.
- O portfólio foi conferido ligando 2 itens temporariamente: as imagens carregam e os links abrem em nova aba.

## Revisão de segurança
Antes de cada publicação, use o prompt de revisão de segurança do Vibe Coding Toolkit (ou `/security-review`). Confira principalmente:
- links externos com `rel="noopener noreferrer"`;
- nenhum segredo no repositório;
- o JSON-LD escapado;
- a página de privacidade de acordo com o que o site realmente faz.
