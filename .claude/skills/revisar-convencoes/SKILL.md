---
name: revisar-convencoes
description: Use ao revisar código deste projeto contra as convenções da equipe — antes de abrir PR, ao pedir "revisa isso", ou ao avaliar código de freelancer. Verifica separação conteúdo/estrutura, props obrigatórias, variantes vs componentes, organização de pastas, acoplamento a fornecedor, idioma e fluxo de Git.
---

# Revisão de convenções

Revise o diff (ou os arquivos indicados) contra as regras abaixo. A fonte de
verdade completa, com o raciocínio de cada regra, está em `docs/CONVENTIONS.md`;
o resumo imperativo está em `AGENTS.md`.

## Como revisar

1. Rode `git diff development...HEAD --stat` para ver o escopo. Se o usuário
   apontou arquivos específicos, use-os.
2. Leia os arquivos alterados **por inteiro** — uma violação de convenção
   raramente aparece só nas linhas do diff (ex: uma prop com default no topo do
   arquivo, um import de vendor lá em cima).
3. Verifique cada item do checklist abaixo.
4. Reporte só o que **de fato viola**. Não invente achado para parecer útil, e
   não repita o que o TypeScript/ESLint já pega.
5. Para cada achado: **arquivo:linha**, a regra violada, e a correção concreta.

## Checklist

### Conteúdo × estrutura
- [ ] Nenhum texto literal dentro de componente (`<h1>Bem-vindo</h1>`,
      `placeholder="Seu nome"`, item de array hardcoded). Isso inclui **texto
      curto** — a regra não tem exceção de tamanho.
- [ ] Todo o conteúdo da rota está no `*.data.ts` co-localizado.
- [ ] O `.data.ts` só tem valores serializáveis. **Nenhum JSX, nenhuma função.**
      Ícone entra por string (`lib/icons.ts`); destaque em título usa `*marcador*`.
- [ ] O `page.tsx` lê como composição: importa o data, injeta props, sem lógica de
      conteúdo.

### Props
- [ ] Props de **conteúdo** são obrigatórias (sem `?`, sem valor default).
- [ ] Só props de **layout** (`variant`, `align`…) têm default.

### Variantes
- [ ] Toda `variant` cabe num `cva()` — ou seja, muda **só classes**.
- [ ] Nenhuma variante muda a árvore HTML (um `if` que renderiza/omite elemento
      conforme a variante ⇒ deveria ser um componente separado).
- [ ] Variantes usam `cva()` + `VariantProps`, não união de string digitada à mão
      + cadeia de `variant === "x" && "..."`.
- [ ] `className` sobrescreve via `cn()`; nenhum `!important`.

### Organização
- [ ] O componente está na gaveta certa: global → `layout/`; bloco de seção →
      `sections/`; página inteira alimentada por `data` → `templates/`; campo de
      formulário → `forms/fields/`.
- [ ] Espaçamento de formulário está no `form-layout`, não repetido em cada form.

### Fornecedores
- [ ] Nenhum SDK de fornecedor (PostHog, flags, CMS) importado em `components/` ou
      `app/`. Analytics é via `track()` de `@/lib/analytics`; fornecedor novo entra
      atrás de uma interface em `lib/`. (O ESLint já barra `posthog-js` — se alguém
      adicionou exceção no `eslint.config.mjs`, isso é um achado.)

### Idioma e comentários
- [ ] Código novo em inglês: arquivos, componentes, props, variáveis, comentários.
- [ ] Conteúdo e rotas em pt-BR.
- [ ] Comentários curtos, explicando **restrição/motivo** — não o óbvio.
- [ ] Sections, templates e layouts novos têm JSDoc no topo explicando o uso.

### Git
- [ ] A branch nasceu de `development` (ou de `main`, se for `hotfix/*`).
- [ ] O PR para `main` usa **merge normal**, nunca squash.

## Dívidas conhecidas (não reporte como achado novo)

- Sections com nome em português (`dores`, `diferenciais`, `servicos`, `portfolio`)
  e comentários em pt — o rename é dívida assumida. **Código novo nasce em inglês.**
- `EmConstrucao` tem `descricao` e `badge` com valor default (conteúdo com default
  é proibido pela §3 — deveriam vir do `.data.ts` de cada rota).
- `forms/` ainda não tem `fields/` nem `form-layout`: cada formulário repete o
  espaçamento dos campos.
- Textos curtos ainda inline em `app/page.tsx` em vez de `home.data.ts`.

Se o diff **piora** uma dessas dívidas, aí sim reporte.
