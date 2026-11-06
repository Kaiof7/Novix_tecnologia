# PRODUCT.md — Site da Novix Tecnologia

## O que é
Site de apresentação da Novix Tecnologia: uma página com serviços, trabalhos, como funciona, montar pedido, plaquinhas NFC e dúvidas. Também tem uma página de privacidade. Todo contato acontece pelo WhatsApp, e o site não guarda nada.

## Para quem
Donos de pequenos negócios de Boqueirão, Campina Grande e região (PB): barbearia, clínica, lanchonete, loja, oficina. A maioria acessa pelo celular, vinda do Instagram.

## Resultado esperado
O visitante entende em segundos o que a Novix faz. Depois ele chega ao WhatsApp com uma mensagem pronta que diz quem é e o que quer.

## Escopo (feito)
- Topo com frase da marca, resultado e dois botões.
- Serviços (5), cada um com resultado, 3 exemplos, preço ("a partir de" ou "sob orçamento") e botão.
  - O botão de plaquinhas NFC leva à loja. Os outros abrem o WhatsApp com uma mensagem própria.
- Portfólio com capturas reais em 375px e 1440px. Ele só aparece para itens com `autorizado: true`.
- Como funciona (4 etapas).
- Montar pedido: um formulário que monta a mensagem e abre o WhatsApp.
  - Obrigatório: nome e pelo menos 1 serviço.
  - Opcional: negócio, segmento, prazo e detalhes (até 300 caracteres).
- Plaquinhas NFC: explicação, 5 modelos, preço e link da loja.
- FAQ. Os depoimentos ficam escondidos enquanto a lista estiver vazia.
- Rodapé com contatos e área de atendimento. O CNPJ aparece quando for preenchido.
- SEO: metadados, Open Graph (/og.png), JSON-LD (Organization + LocalBusiness), sitemap, robots, manifest e ícones.

## Fora de escopo (de propósito)
Backend, banco de dados, login, analytics, cookies, blog e pagamento online.

## Onde mudar conteúdo
- `config/empresa.json`: textos, contatos, serviços, preços, etapas, prazos, FAQ e depoimentos.
- `config/portfolio.json`: trabalhos (veja docs/setup.md, "Adicionar um trabalho").
- O build falha se o JSON estiver inválido (schema Zod em `src/lib/config-schema.ts`).

## Premissas a confirmar com o dono
1. **Portfólio:** nenhum cliente confirmou ainda a autorização para aparecer no site. Todos estão `autorizado: false` e a seção fica escondida.
2. **Domínio:** o site está no ar em `https://novix-site-topaz.vercel.app` (Vercel, projeto `novix-site`). Se trocar por domínio próprio, atualize `siteUrl`; isso afeta o canonical, o sitemap e o OG.
3. **FAQ:** as respostas sobre mensalidade, hospedagem e mudanças depois são genéricas ("combinado na proposta"). Confirme a política real.
4. **Preços:** sites "a partir de R$ 50,00" e plaquinhas "a partir de R$ 40,00" (conferido na loja em 05/11/2026). Os outros serviços são sob orçamento.
5. **CNPJ e depoimentos:** estão vazios e escondidos.
6. **Loja NFC:** a URL `reposit-rio-ambiente.vercel.app` tem um nome técnico. Vale um domínio ou alias mais claro.

## Pendências fora do código
- Duas páginas do portfólio ainda mostram textos de modelo: "Orçamento pelo celular" ("[NOME DA LOJA]", "foto pendente", "WhatsApp ainda não configurado") e "Lanchonete" ("Lanchonete da Esquina · São Paulo"). Corrija antes de autorizar.
- A página da Santa Maria mostra "Outro WhatsApp: (83) 99115-3515", que é o número da Novix. Confirme se está certo.
- Publicação: no ar desde 05/11/2026 em https://novix-site-topaz.vercel.app (deploy pela Vercel CLI).
