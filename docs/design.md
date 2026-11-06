# Design

## Direção
Grafite escuro com o azul da logo como acento. As formas vêm da própria marca: o **corte diagonal** do "N" aparece em divisores, rótulos e marcadores de lista. Títulos em Space Grotesk, texto em Inter, rótulos e preços em JetBrains Mono. Sem numeração nas seções, porque ela pularia um número quando o portfólio está escondido.

## Paleta (tirada de `public/logo.svg`)
| Token | Cor | Uso |
|---|---|---|
| `bg` | #111318 | fundo |
| `surface` | #1A1D24 | cartões, formulário, faixa NFC |
| `ink` | #FFFFFF | texto principal |
| `muted` | #C9CCD2 | texto de apoio |
| `blue` | #1F5BFF | fundo de botão, ícones, formas grandes |
| `blue-text` | #4D7DFF | texto e links em azul |

## Contraste (WCAG 2.x, calculado por `src/lib/contrast.ts`)
| Par | Razão | Resultado |
|---|---|---|
| branco / bg | 18.58 | AAA |
| branco / surface | 16.87 | AAA |
| muted / bg | 11.55 | AAA |
| muted / surface | 10.48 | AAA |
| blue-text / bg | 5.04 | AA |
| blue-text / surface | 4.57 | AA |
| branco / blue (botão) | 5.25 | AA |
| blue / bg | 3.54 | **reprova texto pequeno**: só formas e texto grande |

Regra: texto azul pequeno usa sempre `blue-text`.

## Assets
- **artcraft / VectorCraft:** o servidor MCP `vectorcraft` não conectou nesta sessão (CONNECTION_CLOSED). Por isso não houve geração de vetores nem a etapa de mockup.
- **Substituto:**
  - Logo e símbolo vêm dos SVGs oficiais da marca (`public/logo.svg`, `src/app/icon.svg`).
  - Ícones dos serviços são SVG de traço desenhados no código (`src/components/icons.tsx`).
  - `og.png` e `apple-icon.png` saem de `scripts/brand-assets.mjs`.
- **Portfólio:** capturas reais das páginas ao vivo, nunca mockup inventado. Cada trabalho aparece numa moldura de navegador com a versão de celular sobreposta.

## Cartões e elementos visuais
Os estilos ficam em `src/app/globals.css`, dentro de `@layer components`, para que os utilitários do Tailwind consigam sobrescrevê-los (ex.: `bg-bg` nos cartões da faixa NFC).
- `.card`: borda fina, leve brilho no topo e fundo `surface`. No hover ou foco, a borda fica azul e aparece uma sombra azul. É usado em serviços, etapas, modelos NFC, portfólio e formulário.
- **Topo:**
  - `.hero-grid` desenha a grade fina que some nas bordas.
  - `.glow` é o brilho azul.
  - `HeroVisual` (`src/components/hero-visual.tsx`) mostra um celular com os cartões de `destaques`, vindos de `config/empresa.json`. Cada destaque aponta para um `servico` existente, e o schema rejeita os que não apontam.
  - Com `destaques: []`, o topo volta a mostrar o símbolo da logo.
- **Etapas:** cartões numerados, ligados por uma linha azul no desktop.
- **NFC:** a ilustração `NfcTap` mostra a plaquinha e o celular com ondas de aproximação.

## Movimento
Tudo em CSS. Só `transform` e `opacity` são animados, então não há layout shift (CLS 0). Nada se mexe com `prefers-reduced-motion: reduce`: o conteúdo aparece direto e parado.
| Classe | Efeito |
|---|---|
| `.rise`, `.rise-delay` | entrada do texto e do visual do topo |
| `.pop` + `--i` | cartões do celular entram em sequência |
| `.float` | celular e ilustração NFC flutuam devagar |
| `.glow`, `.grid-pan` | brilho "respira" e grade desliza |
| `.ring` + `--i` | ondas da plaquinha NFC |
| `.reveal` | cartões sobem ao entrar na tela (`animation-timeline: view()`) |
| `.draw` | linha das etapas se desenha ao rolar |
| `.card:not(form):hover` | cartão sobe 4px (o formulário não sobe, para não mexer enquanto a pessoa digita) |

`.reveal` e `.draw` só entram em navegadores com `animation-timeline` (Chrome e Edge). Nos outros, tudo aparece sem animação. Por isso um screenshot de página inteira sem rolagem mostra os cartões "vazios": para conferir, role até a seção (docs/quality.md).

## Acessibilidade
- Link "Pular para o conteúdo".
- Foco visível em tudo.
- Alvos de toque com 44px ou mais.
- `lang="pt-BR"`.
- Erros do formulário com `role="alert"`, e o foco vai para o primeiro serviço.
- Links externos avisam "(abre em nova aba)" para leitores de tela.
