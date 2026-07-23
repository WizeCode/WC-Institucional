# AGENTS.md

Regras de trabalho neste repositório. Valem para qualquer agente de IA.
Elas são o resumo imperativo de `docs/CONVENTIONS.md` — leia o documento
completo quando precisar do **porquê** de uma regra ou de exemplos.

## Stack

Next.js (App Router) · TypeScript · Tailwind v4 · shadcn/ui · Prettier · ESLint.
Sem testes automatizados: valide com `npm run typecheck`, `npm run lint`,
`npm run build` e o navegador.

## Componentes e conteúdo

- **Conteúdo nunca vive dentro do componente.** Todo texto de uma rota vai no
  `app/**/<rota>.data.ts` — **inclusive texto curto**. Sem exceção de tamanho.
- **Props de conteúdo são obrigatórias.** Sem valor default, sem placeholder de
  exemplo. Só props de *layout* (ex: `variant`) podem ter default.
- **Dados são serializáveis:** string, número, array, objeto simples. **Nunca JSX
  nem função no `.data.ts`.**
  - Ícone entra por **string**, resolvida pelo registro `lib/icons.ts`.
  - Destaque usa marcador + helper `rich` (`lib/text.tsx`): `*texto*` vira
    `text-accent`, `_texto_` vira `<em>`. Quebra de linha em título é `\n`.
- **`page.tsx` é só composição:** importa o `.data.ts`, escolhe componentes,
  injeta props. Deve ler como um índice da página.
- O **slot de mídia** (`children`: `<Terminal>`, imagem) é composição, fica no
  `page.tsx`/template — não é dado.

## Variante ou componente novo

> Se a variação **cabe num `cva()`**, é uma variante. Se **não cabe**, é um
> componente novo.

`class-variance-authority` já é dependência (é como `Button`/`Badge` do shadcn são
escritos). CVA mapeia variante → classes; ele não muda a árvore HTML — e é essa
limitação que serve de régua. Se a variante precisa de um `if` que renderiza ou
omite um elemento, ela é um componente separado disfarçado.

Ao criar variantes, use `cva()` + `VariantProps` (não digite a união de tipos à
mão) e componha com `cn()` para que `className` continue sobrescrevendo via
`tailwind-merge`. **Nunca use `!important`.**

## Onde cada componente mora

| Pasta | O que entra |
| --- | --- |
| `components/ui/` | primitivos do shadcn (não editar por conteúdo) |
| `components/layout/` | **só o que é global**: header, footer, `Section` |
| `components/sections/` | blocos de seção concretos do produto (`Hero`, Serviços, FAQ…) |
| `components/templates/` | composições de **página inteira** alimentadas por `data` (`ServicoPage`, `LegalPage`, `FormPage`, `EmConstrucao`) |
| `components/forms/` | `fields/` (primitivos) + `form-layout` (espaçamento **entre campos**) + formulários concretos |
| `lib/` | fontes de verdade compartilhadas, server actions, validação, adaptadores |

Um template **não** é o `layout.tsx` do Next: `layout.tsx` só embrulha `children`
e não recebe props. Não force um no outro.

## Fornecedores (analytics, flags, CMS)

Fornecedor de infraestrutura **nunca é importado direto** numa página ou
componente — sempre atrás de uma interface que o app define, em `lib/`.

- **Analytics:** use `track()` de `@/lib/analytics`.
  Ex: `onClick={() => track("cta_contact_clicked", { source: "hero" })}`.
  O SDK do PostHog só existe em `lib/analytics/adapters/` (traduz) e em
  `components/providers/posthog-provider.tsx` (inicializa). O **ESLint barra**
  `posthog-js` em `components/` e `app/` — não crie exceção; use a interface.
- **Fornecedor novo** (flags, CMS): mesmo molde — `lib/<dominio>/types.ts`
  (contrato), `adapters/` (um por fornecedor), `index.ts` (escolhe qual).

## Idioma

- **Inglês:** nomes de arquivo, componentes, props, variáveis, funções e comentários.
- **pt-BR:** rotas (`/servicos`, `/contato`) e todo o conteúdo (`*.data.ts`).

As sections antigas têm nome em português (`dores`, `diferenciais`) — dívida
assumida. **Código novo nasce em inglês.**

## Comentários

Curtos, uma linha quando possível. Não comente o óbvio; comente **restrição e
motivo** — o que o código não mostra sozinho. Use **JSDoc no topo** de sections,
templates e layouts explicando *como usar* (aparece no hover do editor).

## Estilo e formatação

Ordem das classes Tailwind é **automática** via `prettier-plugin-tailwindcss` —
rode `npm run format`; não ordene classe na mão.

## Git

- `feature/*` e `fix/*` nascem de **`development`** → PR com **squash**.
- `development` → `main`: PR com **merge normal**. **Nunca squash** (quebra a
  ancestralidade e gera conflito `add/add` no ciclo seguinte).
- `hotfix/*` nasce de **`main`** e volta para `main` **e** `development`.
- Versão se marca com **tag**. Não usamos `release/*` neste projeto.
- **Nunca** `reset --hard` ou `push --force` na `development`.
- Não commite sem o Pedro pedir explicitamente.
