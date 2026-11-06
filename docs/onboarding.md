# Primeiros passos

1. Instale o Node 24 ou mais novo e rode `npm install`.
2. Rode `npm run dev` e abra http://localhost:3000.
3. Para mudar um texto, edite `config/empresa.json`. A página recarrega sozinha. Se o JSON ficar inválido, o terminal mostra qual campo está errado.
4. Antes de entregar qualquer mudança, rode `npm run check`.

## Tarefas comuns
| Quero… | Onde |
|---|---|
| trocar telefone, e-mail ou Instagram | `config/empresa.json` → `whatsapp`, `email`, `instagram` |
| mudar preço de um serviço | `servicos[].precoCentavos` (em centavos; `null` = "sob orçamento") |
| mudar a mensagem de um botão | `servicos[].mensagem` ou `mensagemPadrao` |
| adicionar pergunta no FAQ | `faq[]` |
| adicionar depoimento | `depoimentos[]` (`texto`, `autor`, `negocio`); a seção aparece sozinha |
| mostrar o CNPJ no rodapé | `cnpj` |
| trocar os cartões do celular no topo | `destaques[]` (`servico`, `titulo`, `texto`; até 3; vazio = símbolo da logo) |
| adicionar um trabalho | veja [setup.md](setup.md#adicionar-um-trabalho-ao-portfólio) |
| mudar cor | `src/app/globals.css` e `src/lib/palette.ts` (confira o contraste em [design.md](design.md)) |

## Regras
As regras do projeto estão no fim de [AGENTS.md](../AGENTS.md): nada de dado no código, lógica testada, até 350 linhas por arquivo e site sempre estático.
