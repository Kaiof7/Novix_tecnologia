# Setup e publicação

## Origem
- Criado com `create-next-app` (Next.js 16.4, React 19.3, Tailwind v4) e o roteiro do [Vibe Coding Toolkit](https://github.com/soumatheusgomes/vibe-coding-toolkit), prompt 11 (bootstrap).
- Revisão do toolkit usada: `21b71b68679c11184f49c23168852014bf6dde8b`. Dela vieram `eslint-rules/` e o perfil de lint tipado.
- Partes do bootstrap que **não** foram aplicadas, e por quê:
  - Instalação de skills: as skills globais do Claude Code já estavam instaladas e foram reaproveitadas.
  - Graphify: o projeto é pequeno e o grafo não traria ganho.
  - Harness, banco, Drizzle, Pino e analytics: o site é estático e sem backend (veja architecture.md).
- Node 24 e npm.

## Adicionar um trabalho ao portfólio
1. **Peça autorização por escrito ao cliente** para mostrar o trabalho.
2. Gere as capturas reais:
   ```bash
   node scripts/capture-portfolio.mjs nome-do-trabalho https://endereco-do-trabalho
   ```
   Isso cria `public/portfolio/nome-do-trabalho-1440.webp` e `-375.webp`. Se o Chrome estiver em outro lugar, defina `CHROME_PATH`.
3. Abra as duas imagens e confira se não aparece texto de modelo nem dado sensível.
4. Adicione o item em `config/portfolio.json` com `nome`, `segmento`, `resolve`, `link`, `capa`, `capaMobile` e `autorizado: true`.
5. Rode `npm run check`. A seção e o item "Trabalhos" do menu aparecem sozinhos.

## Conferir o preço das plaquinhas
O preço vem de `lojaNfc.precoCentavos` e de `servicos[nfc].precoCentavos`. Quando a loja mudar de preço, atualize os dois e também `lojaNfc.conferidoEm`. Última conferência: 05/11/2026, "a partir de R$ 40,00".

## Trocar a logo, o ícone ou a imagem de compartilhamento
- Logo do site: `public/logo.svg` e o componente `Symbol` em `src/components/brand.tsx`.
- Favicon: `src/app/icon.svg`.
- `apple-icon.png` e `public/og.png`: edite `scripts/assets/` e rode `node scripts/brand-assets.mjs`.

## Publicar na Vercel (passo a passo, **não executado**)
Antes de publicar, resolva as premissas do PRODUCT.md, principalmente `siteUrl` e o portfólio.

1. Crie um repositório no GitHub e envie o projeto:
   ```bash
   git remote add origin https://github.com/<usuario>/novix-site.git
   ```
   ```bash
   git push -u origin main
   ```
2. Na Vercel, abra **Add New → Project** e importe o repositório. A Vercel detecta Next.js sozinha. Não precisa de variável de ambiente.
3. Faça primeiro um **preview deployment** (qualquer branch diferente de `main`, ou `npx vercel` sem `--prod`). Nele, rode a validação de docs/quality.md.
4. Com o preview aprovado, publique em produção: faça merge em `main` ou rode `npx vercel --prod`.
5. Atualize `siteUrl` em `config/empresa.json` para o endereço final, rode o build e publique de novo. O endereço final pode ser o próprio `.vercel.app`.

### Domínio próprio (opcional)
1. Compre o domínio (ex.: `novixtecnologia.com.br` no Registro.br).
2. Na Vercel, vá em **Project → Settings → Domains → Add** e informe o domínio.
3. No Registro.br, crie os registros DNS que a Vercel mostrar (A para o domínio raiz, CNAME para `www`).
4. Troque `siteUrl` para `https://seu-dominio` e publique de novo.
5. No Google Search Console, adicione o domínio e envie `https://seu-dominio/sitemap.xml`.

### Outros hosts
`npm run build` gera `out/`, uma pasta de arquivos estáticos. Ela pode ir para Netlify, Cloudflare Pages ou GitHub Pages sem mudanças.
