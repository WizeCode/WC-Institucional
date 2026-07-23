# Convenções de Componentes e Páginas

> Como estruturamos componentes, páginas e o fluxo de trabalho neste projeto — e por quê.
> Este documento é a referência oficial da equipe. Leia antes de criar um
> componente novo, uma página nova ou abrir um PR.

---

## 1. O princípio central

**Componente de layout = esqueleto. Página = conteúdo.**

Um componente de layout descreve *como as coisas se arranjam na tela*. Ele não
sabe **o que** vai dentro. Quem sabe o "o quê" é a página.

A forma mais fácil de internalizar isso:

> Um componente é uma **função que você chama**, não um **template que você edita**.

Quando um componente vem com conteúdo fixo e você entra nele para trocar o texto,
você o está tratando como template. O sintoma é clássico com bibliotecas como o
shadcn/ui: em vez de passar o conteúdo por props, a pessoa edita o valor padrão
dentro do componente. Funciona uma vez — e trava todo o resto (reuso, teste,
consistência, biblioteca compartilhada).

A mentalidade correta: o componente expõe uma **interface** (as props), e cada
página **chama** essa interface com o conteúdo dela.

```tsx
// ❌ Template que se edita — o conteúdo vive dentro do componente
const Hero = () => <h1>Bem-vindo à WizeCode</h1>

// ✅ Função que se chama — o conteúdo vem de fora
const Hero = ({ title }: HeroProps) => <h1>{title}</h1>
// ...e a página chama:
<Hero title={home.hero.title} />
```

---

## 2. A linha entre "conteúdo" e "componente"

A pergunta que sempre aparece em code review: *"isso é conteúdo (vai pros dados)
ou é do componente (fica dentro)?"*. Use esta régua:

| Vai para os **dados** (conteúdo) | Fica no **componente** (estrutura/comportamento) |
| --- | --- |
| Textos: títulos, descrições, labels | Arranjo/layout (`flex`, `grid`, breakpoints) |
| Itens de lista (serviços, projetos, FAQ) | Tipografia e espaçamento do esqueleto |
| Imagens (`src`, `alt`) e `href` | Animações e transições |
| Dados de apresentação atrelados ao conteúdo (ex: a `color` de cada card de serviço) | Comportamento (ex: qual card está ativo no hover) |
| Nomes/labels de CTA e seus destinos | Integrações técnicas (analytics, telemetria) |
| Placeholders e labels de campos de formulário | Validação e envio (schema, server action) |

**Casos de borda resolvidos (para não brigar em PR):**

- **A `color` de um serviço** é dado do conteúdo → vai com o conteúdo, nos dados.
- **O evento de analytics** é comportamento → mas o componente **não** conhece o
  fornecedor: recebe um callback. Ver seções 10 e 11.
- **O slot de mídia** (`children`: um `<Terminal>`, uma imagem) **não** é conteúdo
  textual — é composição, e vive no `page.tsx`/template. Só o que é *dado*
  (título, texto, `src`, `href`) vai para o `.data.ts`.

Regra de bolso: **se muda quando você usa o componente em outra página, é
conteúdo.** Se é sempre igual em qualquer página, é do componente.

---

## 3. Props obrigatórias, sem valor padrão

Esta é a regra que faz a convenção **se fiscalizar sozinha**.

Componentes de layout **não** definem defaults de conteúdo, nem placeholders de
exemplo. As props de conteúdo são **obrigatórias**. Assim, se uma página esquecer
de passar o conteúdo, o TypeScript reclama — e o erro aparece no editor, não em
produção.

```tsx
// ❌ Default esconde conteúdo dentro do componente e mascara esquecimentos
interface HeroProps {
    title?: React.ReactNode
}
const Hero = ({ title = "Título padrão" }: HeroProps) => ...

// ✅ Obrigatória: a página é forçada a fornecer, o TS cobra
interface HeroProps {
    title: React.ReactNode
}
const Hero = ({ title }: HeroProps) => ...
```

Props que controlam **variação de layout** (não conteúdo) podem ter default,
porque representam a escolha mais comum de arranjo — não um conteúdo escondido:

```tsx
interface HeroProps {
    variant?: "default" | "reversed"  // ok: default de layout
    title: React.ReactNode            // obrigatória: conteúdo
}
```

---

## 4. Onde o conteúdo mora: `*.data.ts`, sempre

**Todo o conteúdo de uma rota vive num módulo de dados co-localizado** — um
arquivo `*.data.ts` ao lado da página. Sem exceção de tamanho: mesmo um título de
uma linha vai para lá.

```text
app/
  servicos/
    page.tsx          ← compõe a página (escolhe componentes, injeta dados)
    servicos.data.ts  ← todo o conteúdo desta rota
```

Por que **sem exceção**, mesmo para texto curto:

- **A promessa fica íntegra.** "Para mudar um texto do site, você mexe no
  `.data.ts`" só é verdade se for verdade *sempre*. Com exceção por tamanho, quem
  vai editar precisa caçar o texto em dois lugares.
- **"Curto" é subjetivo** e vira discussão em PR. A regra sem exceção não precisa
  de julgamento.
- **É o degrau para o CMS.** No dia em que marketing/comercial precisar editar
  texto sem tocar em código, a fonte migra de `.data.ts` para um CMS (Sanity,
  Payload) ou MDX. Como o componente já é puro e o conteúdo já está inteiro num
  lugar, a migração troca a fonte do dado e o componente nem fica sabendo. Se
  metade do texto estiver espalhada nos `page.tsx`, essa migração vira uma
  caçada.

O `page.tsx` fica sendo **só composição**: importa o data, escolhe componentes,
injeta. Ele deve ler como um índice da página.

```tsx
// app/servicos/servicos.data.ts
export const servicos = {
    hero: {
        badge: "/ Serviços",
        title: "O que a WizeCode entrega",
    },
    services: [
        { id: "institucional", title: "Institucional", color: "#0f101f", /* ... */ },
        // ...
    ],
}

// app/servicos/page.tsx
import { servicos } from "./servicos.data"

export default function Page() {
    return (
        <Section>
            <Servicos
                badge={servicos.hero.badge}
                title={servicos.hero.title}
                services={servicos.services}
            />
        </Section>
    )
}
```

### O dado é sempre serializável (string, número, array — nunca JSX)

Duas consequências práticas dessa regra, porque um CMS jamais devolve JSX:

**Ícones — registro central.** Um dado de conteúdo às vezes aponta para um
*componente* (`Brain`, `FaWhatsapp`). Bater o componente direto nos dados esbarra
em duas paredes: o React **proíbe passar funções** de um Server Component para um
Client Component (*"Functions cannot be passed directly to Client Components"*), e
um CMS guardaria a string `"brain"`, nunca a função. A solução é um registro
`string → componente`:

```ts
// lib/icons.ts — a paleta de ícones disponíveis
import { Brain } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export const icons = { brain: Brain, whatsapp: FaWhatsapp /* ... */ } as const
export type IconName = keyof typeof icons
```

```ts
// home.data.ts — referencia por string (atravessa a fronteira, CMS-ready)
{ letter: "W", title: "Wisdom", icon: "brain" }
```

```tsx
// diferenciais.tsx — o componente traduz string → componente
import { icons, type IconName } from "@/lib/icons"
const Icon = icons[item.icon]
```

Adicionar um ícone **novo** custa uma linha em `lib/icons.ts` — não é "mexer no
componente", é ampliar o catálogo.

**Destaque no texto — marcadores.** Para não colocar `<span>` nem `<em>` nos
dados, o texto usa marcadores e o helper `rich` (`lib/text.tsx`) traduz na
renderização: `*destaque*` vira `text-accent` e `_ênfase_` vira `<em>`.

```ts
// data: string pura, CMS-ready
title: "Tecnologia *inteligente* para o seu negócio"
description: "Soluções escaláveis – _com a clareza de quem domina o processo._"
```

Quebra de linha no título é `\n` no dado — o `h1` do `Hero` usa
`whitespace-pre-line`.

Os dois são o mesmo padrão: **o dado depende de uma convenção estável (string), não
de um SDK ou de um elemento React.**

---

## 5. Variante ou componente novo? O teste do CVA

A dúvida recorrente: "isso vira `variant="soft"` ou vira um `SectionSoft`?".
O critério é objetivo:

> **Se a variação cabe num `cva()`, é uma variante. Se não cabe, é um componente novo.**

`class-variance-authority` (CVA) já é dependência do projeto — os primitivos do
shadcn (`Button`, `Badge`) são escritos assim. Ele mapeia **variante → classes**.
Ele não sabe, e não deve saber, mudar a árvore HTML. É exatamente essa limitação
que serve de régua.

### Cabe no CVA → é variante

`Section` é o caso canônico: um único elemento, cujas variantes trocam apenas
fundo, cor e espaçamento.

```tsx
const sectionVariants = cva("my-8 px-8 py-8 sm:py-16", {
    variants: {
        variant: {
            default: "",
            soft: "mx-4 rounded-md bg-foreground/5 px-4 sm:px-8 dark:bg-accent/10",
            accent: "relative mx-4 rounded-md bg-accent px-4 text-white sm:px-8 dark:bg-accent/10",
        },
    },
    defaultVariants: { variant: "default" },
})

interface SectionProps extends VariantProps<typeof sectionVariants> {
    children: React.ReactNode
    className?: string
    backdrop?: React.ReactNode
}

const Section = ({ children, className, variant, backdrop }: SectionProps) => (
    <section className={cn(sectionVariants({ variant }), className)}>
        {backdrop}
        <div className="container mx-auto">{children}</div>
    </section>
)
```

Três ganhos além da legibilidade: o tipo da união sai de `VariantProps` (não se
digita a mão, não desincroniza); o `cn()` externo mantém `className` sobrescrevendo
via `tailwind-merge` (nunca use `!important`); e `compoundVariants` fica disponível
quando duas variantes combinarem.

### Não cabe no CVA → é componente novo

Dois sintomas, ambos vistos no nosso próprio código:

**(a) A variante muda a árvore HTML.** Se para atender a variante você escreve um
`if` que renderiza ou omite um elemento, ela não é uma variante — é outro
componente. O `Hero` tinha `variant="centered"`, e essa variante *escondia o slot
de mídia* (`{!centered && children}`). Isso é estrutura, não estilo — por isso hoje
são dois componentes: `Hero` (mídia lateral, com `variant` `default`/`reversed`
no `cva()`) e `HeroCentered` (coluna única, sem slot de mídia). Os dois
compartilham o miolo (`HeroBody`), que é privado do arquivo.

**(b) A variante mexe em vários nós da árvore.** Ainda é estilo, e ainda cabe no
CVA — mas custa um `cva()` por elemento, porque CVA não tem o conceito de *slots*.
É o caso do `Hero`: um `cva()` para o wrapper, um para o miolo, um para a linha de
CTAs. Três, tudo bem. Se forem muitos, é sinal de que o componente está fazendo
coisa demais e deveria ser quebrado. (Existe `tailwind-variants`, um superset do
CVA com slots nativos. Não adotamos: seria uma segunda ferramenta de variantes
convivendo com o CVA do shadcn. Se a dor aparecer de verdade, reavaliamos.)

### Nomeação

Componentes irmãos, quando existirem, seguem o padrão dos blocks do shadcn: nome
descritivo quando houver um (`HeroCentered`), numerado quando não houver
(`Hero2`). Nunca duplique estrutura só para mudar cor — isso é o que `variant`
resolve.

---

## 6. Estrutura de arquivos

```text
components/
  ui/          ← primitivos (shadcn/ui): Button, Badge, Terminal…
  layout/      ← chrome e wrappers GLOBAIS (servem qualquer página)
    section.tsx        ← wrapper de seção (<section> + container)
    header.tsx  footer.tsx
  sections/    ← blocos de seção concretos deste produto
    hero.tsx           ← Hero + HeroCentered (esqueletos, conteúdo via props)
    servicos.tsx  faq.tsx  dores.tsx  portfolio.tsx  contact-channels.tsx …
  templates/   ← composições de PÁGINA INTEIRA, alimentadas por data
    servico-page.tsx  legal-page.tsx  form-page.tsx  em-construcao.tsx
  forms/       ← formulários
    fields/            ← primitivos de campo (label, input, select)
    form-layout.tsx    ← o arranjo/espaçamento comum a todo formulário
    contato-form.tsx  trabalhe-conosco-form.tsx

app/
  page.tsx            ← compõe a home
  home.data.ts        ← conteúdo da home
  servicos/
    institucional/
      page.tsx          ← chamador fino do template
      institucional.data.ts
```

**A regra de cada gaveta:**

- `ui/` — primitivos apresentacionais (é o shadcn; não editamos por conteúdo).
- `layout/` — **só o que é global**: chrome e wrappers que servem qualquer página
  de qualquer projeto (`Section`, header, footer). Se o componente só faz sentido
  em uma família de páginas, ele **não** é layout.
- `sections/` — **blocos de seção** concretos do produto. Esqueletos puros
  (conteúdo via props), mas específicos deste site. O nome não deve amarrá-los a
  uma rota. O `Hero` mora aqui: ele é um bloco de conteúdo, não chrome — quem
  embrulha ele é o `Section`, e *esse* sim é global.
- `templates/` — **composições de página inteira**. Quando várias rotas
  compartilham a mesma sequência de seções e só o conteúdo muda, a composição sobe
  para cá e cada `page.tsx` vira um chamador fino:

  ```tsx
  // app/servicos/institucional/page.tsx
  export default () => <ServicoPage data={institucional} />
  ```

  Já temos quatro casos: `ServicoPage`, `LegalPage`, `FormPage` e `EmConstrucao`.

  Cuidado com um nome parecido: **`FormPage` (template) × `form-layout` (dentro de
  `forms/`)** são coisas diferentes. `FormPage` é a **página** — título à esquerda,
  formulário à direita. `form-layout` é o **espaçamento entre os campos**, dentro
  do formulário.

  > Isto **não** é o `layout.tsx` do Next. O `layout.tsx` é uma palavra reservada
  > do framework que só embrulha `children` — ele não recebe props nem sabe qual
  > `data` carregar. Um template recebe `data`. São coisas diferentes; não force
  > uma na outra.

- `forms/` — **primitivos de campo separados do layout do formulário**. Os campos
  (label, input, select) ficam em `fields/`; o **espaçamento e o arranjo** ficam
  num único `form-layout`. Motivo prático: "aumenta o padding dos formulários"
  deve ser **um** arquivo, não um por formulário. Cada formulário concreto
  (`contato-form`, `trabalhe-conosco-form`) tem campos e validação próprios — isso
  é irredutível — mas nenhum deles redefine espaçamento.
- `app/**/page.tsx` — composição: escolhe componentes, injeta conteúdo.
- `app/**/*.data.ts` — todo o conteúdo daquela rota (seção 4).

A regra de conteúdo × estrutura vale **dentro** do template também: só o que varia
entre rotas entra no `data`; o que é igual em todas (variantes de `Section`,
partículas, cabeçalhos genéricos) fica fixo no template.

---

## 7. Exemplo trabalhado — a home

```tsx
// app/home.data.ts — TODO o conteúdo, inclusive os textos curtos
export const home = {
    hero: {
        badge: "/ Hero",
        title: "Tecnologia *inteligente* para o seu negócio",
        cta: { primary: { text: "Fale com nossa equipe", url: "/contato" } },
    },
    servicos: { title: "…", services: [ /* … */ ] },
    contato:  { title: "…", infoCards: [ /* … */ ] },
}
```

```tsx
// app/page.tsx — só composição
import { home } from "./home.data"

<Section className="my-0 sm:py-16">
    <Hero
        badge={home.hero.badge}
        title={rich(home.hero.title)}
        cta={home.hero.cta}
    >
        {/* slot de mídia: composição, não dado */}
        <HeroTerminal {...home.hero.terminal} />
    </Hero>
</Section>

<Section variant="soft">
    <Servicos title={home.servicos.title} services={home.servicos.services} />
</Section>

<Section variant="accent" backdrop={<Particles … />}>
    <Contato title={home.contato.title} infoCards={home.contato.infoCards} />
</Section>
```

A página lê como uma **composição**: dá para ver o layout inteiro de relance, e
todo o conteúdo está num lugar só — o `home.data.ts`.

---

## 8. Comentários e idioma

### Idioma

- **Código em inglês:** nomes de arquivo, componentes, props, variáveis, funções e
  **comentários**.
- **Português no que é do usuário:** rotas (`/servicos`, `/trabalhe-conosco`) e
  todo o conteúdo (`*.data.ts`).

O corte é esse: se um dev lê, é inglês; se um visitante lê, é português.

> **Dívida assumida:** as sections de hoje têm nome em português (`dores`,
> `diferenciais`, `servicos`, `portfolio`). O rename entra na refatoração, não é
> pré-requisito de PR novo. **Código novo já nasce em inglês.**

### Comentários

- **Compactos.** Uma linha resolve a maioria dos casos. Blocos de quatro linhas
  para explicar duas linhas de código são ruído.
- **Não explique o óbvio.** Se o nome da prop já diz o que ela faz, o comentário
  não acrescenta. Comente **restrição e motivo** — o que o código não consegue
  mostrar sozinho.
- **JSDoc no topo de sections, templates e layouts**, documentando *como usar*:
  o que o componente renderiza, o que espera receber, e qualquer pegadinha. O
  VS Code mostra isso no hover, e é o que evita alguém ter que abrir o arquivo
  para descobrir a interface — vale especialmente para freelancers.

```tsx
/**
 * Full-width service page: hero, deliverables, process, FAQ and CTA.
 * Feed it with the route's `*.data.ts`; every section is optional except `hero`.
 */
export const ServicoPage = ({ data }: ServicoPageProps) => ...

// Turnstile runs in managed mode: the widget must stay visible.
```

---

## 9. Ordem de escrita das classes Tailwind

**Ninguém ordena classe na mão. A ferramenta faz.**

O projeto já usa `prettier-plugin-tailwindcss`, configurado no `.prettierrc`
(inclusive com `cn` e `cva` em `tailwindFunctions`, então classes dentro dessas
funções também são ordenadas). Basta `npm run format` — ou salvar com o Prettier
ativo no editor.

A ordem que o plugin aplica é a **oficial do Tailwind**, e ela segue exatamente o
raciocínio que queríamos: primeiro o que define a **estrutura** (layout, box model),
depois tipografia, depois pintura (cores, bordas, sombra), e as variantes
condicionais (`hover:`, `focus-visible:`, `dark:`, `data-[…]`) por último — porque
descrevem o que acontece *às vezes*, não o estado base.

```tsx
// ✅ o resultado do plugin
"flex flex-col items-center gap-4 rounded-md bg-card p-6 text-sm font-medium text-muted-foreground hover:bg-muted dark:bg-card/50"
```

Vantagem sobre uma convenção escrita: não há o que memorizar, não há o que revisar
em PR, e não existe discussão de gosto. Se a equipe quiser uma ordem *diferente* da
oficial, aí sim ela vira regra escrita — mas o custo (revisar à mão, para sempre)
provavelmente não compensa.

---

## 10. Horizonte: biblioteca de componentes da empresa

Estes componentes tendem a virar uma **biblioteca compartilhada entre projetos**.
Para um componente sobreviver a essa mudança, ele **não pode ter acoplamento a algo
específico de um app**. Quando extrair um componente para a lib, remova:

- **Analytics direto** (`usePostHog`, `posthog.capture`) → troque por um callback
  opcional: `onCtaClick?: () => void`. Quem usa decide o que rastrear.
- **Rotas fixas** (`/servicos/institucional`) → sempre via props (`href`).
- **Tipos específicos do app** (`@/types/services`) → o componente define sua
  própria interface mínima; o app faz o mapeamento.

Sobre analytics, o passo já foi dado: nenhum componente conhece o PostHog. Todos
chamam `track()` de [`lib/analytics`](../lib/analytics/index.ts) — a interface do
app —, e o **ESLint barra** `posthog-js` em `components/` e `app/` (única exceção:
o provider que dá boot no SDK). Ver seção 11.

O que **ainda falta** para um componente viajar de projeto: hoje o `track()` é
importado pelo componente. Na hora de extrair para a biblioteca, ele vira prop
(`onCtaClick?: () => void`) e quem consome decide se rastreia — o componente deixa
de saber até que analytics existe.

Componente novo já nasce assim: **quanto menos ele souber sobre este app
específico, mais longe ele viaja.**

---

## 11. Fronteiras com fornecedores: evitando lock-in (flags, analytics, CMS)

As seções anteriores tiraram o **conteúdo** de dentro dos componentes. Esta
seção tira a **infraestrutura de fornecedores** de dentro do app inteiro — pela
mesma razão e pelo mesmo mecanismo.

### A meta-regra

> **Fornecedor de infraestrutura — feature flags, analytics, CMS — nunca é
> importado direto numa página ou componente. Sempre atrás de uma interface que
> o app define.**

Conteúdo, experimentos e analytics são todos "decisões/infra". Nenhum deles deve
estar espalhado como SDK de vendor pela UI. Todos passam por **fronteiras que
você controla**. É uma única filosofia — inversão de dependência (*Ports &
Adapters*) — cobrindo os três.

É o mesmo princípio dos componentes: assim como o componente depende de uma
*interface* (as props) e não de uma fonte concreta de conteúdo, o **app** depende
de uma *interface* que ele define, e não do SDK de um fornecedor.

### Analytics: o caso já implementado

Nenhum componente conhece o PostHog. A estrutura é a canônica de Ports & Adapters:

```text
lib/analytics/
  types.ts             ← o contrato (nosso): Analytics.track(event, props)
  adapters/posthog.ts  ← o adaptador (traduz track → posthog.capture)
  index.ts             ← escolhe o adaptador. Trocar de vendor = ESTA linha.
```

> **Não confunda com `components/providers/posthog-provider.tsx`.** Aquele é um
> *provider do React*: embrulha a árvore e **inicializa** o SDK (`posthog.init`,
> pageview). Este é um *adapter*: **traduz** a nossa chamada `track()` para o
> vocabulário do fornecedor. Um liga, o outro traduz — e são os dois únicos
> arquivos do projeto que enxergam o SDK.

```tsx
// em qualquer componente
import { track } from "@/lib/analytics"

onClick={() => track("cta_contact_clicked", { source: "hero" })}
```

O **ESLint impede** importar `posthog-js` em `components/` e `app/`
(`no-restricted-imports`, em `eslint.config.mjs`). A única exceção é
`components/providers/posthog-provider.tsx`, que dá boot no SDK. Fornecedor novo
entra pelo mesmo caminho — e ganha sua própria regra de lint.

> **Por que `track()` importado, e não um callback (`onCtaClick`)?** Porque a
> página é Server Component, e o React **proíbe passar função** de Server para
> Client — a mesma parede que forçou o registro de ícones (seção 4). O callback é
> o formato certo no momento de **extrair o componente para a biblioteca**
> (seção 10): aí quem embrulha decide o rastreio, e o componente deixa de saber
> até que analytics existe.

### Na prática — o próximo fornecedor (ex: flags) segue o mesmo molde

```ts
// lib/flags/types.ts — SEU contrato. Não pertence a vendor nenhum.
export interface FlagProvider {
    variant(key: string, visitorId: string): Promise<string>
}
```

```ts
// lib/flags/adapters/*.ts — os adaptadores (escritos quando precisar)
export const posthogFlags: FlagProvider = { /* chama posthog */ }
export const vercelFlags:  FlagProvider = { /* chama vercel flags */ }
export const staticFlags:  FlagProvider = { /* env/config, zero vendor */ }
```

```ts
// app/page.tsx — o app só conhece a SUA interface
import { flags } from "@/lib/flags"
const variant = await flags.variant("home-hero", visitorId)
```

Trocar Vercel → PostHog → self-hosted vira **uma linha** (qual adaptador você
pluga), e nenhuma página ou componente fica sabendo. Existe também um padrão de
mercado vendor-neutro para isso — **OpenFeature** (projeto da CNCF), que é este
mesmo Ports & Adapters padronizado, com providers prontos. Comece com uma
interface própria simples; migre para OpenFeature quando quiser providers de
prateleira ou padronizar entre muitos times.

### Conexão com A/B testing — a composição decide, o componente obedece

Como o componente é um esqueleto que só recebe conteúdo por props, testar
variações é decisão da **camada de composição**, não do componente. A página
avalia a flag (pela interface acima) e escolhe o que renderizar — de um texto de
botão a uma **seção inteira**:

```tsx
// app/page.tsx (Server Component)
const variant = await flags.variant("home-hero", visitorId)

return (
    <Section className="my-0 sm:py-16">
        {variant === "video" ? <HeroVideo /> : <HeroTerminal />}
    </Section>
)
```

Uma linha muda; **nenhum componente de UI muda por dentro**. No anti-padrão
(conteúdo dentro do componente), o mesmo teste exigiria `if (experimento)`
espalhado dentro da UI. A pureza do componente é o que torna o experimento trivial.

Duas ressalvas práticas ao testar seções:

- **Avalie no servidor/edge, não no client.** Avaliação client-side mostra a
  variante padrão e depois troca → *flicker* e pulo de layout (catastrófico numa
  seção inteira above-the-fold). Server-side entrega a variante certa no primeiro byte.
- **Estático × dinâmico.** Variante por visitante obriga a página a decidir por
  request (rota dinâmica) ou a bucketar no middleware do edge. É um trade-off de
  performance a decidir conscientemente — ainda mais numa home otimizada para ser estática.

### O que fazer agora: adote a regra, escreva o código depois

Não construa a abstração antes de ter um consumidor real — isso é
over-engineering. O custo hoje é **uma frase de política** (esta seção). O
benefício é: quando você adicionar flags ou trocar de analytics, já adiciona a
interface no dia 1, nunca chama o vendor direto da UI. Zero refatoração futura.

---

## 12. Fluxo de Git

Duas branches permanentes: **`main`** (produção) e **`development`** (integração;
é a que o Coolify observa como homologação).

| Merge | Como | Por quê |
| --- | --- | --- |
| `feature/*` → `development` | **PR com squash** | Cada feature vira um commit limpo na development. |
| `development` → `main` | **PR com merge normal (nunca squash)** | Preserva a ancestralidade. É o que evita o conflito descrito abaixo. |
| `hotfix/*` → `main` **e** `development` | PR em cada uma | A correção precisa existir nas duas, senão volta no próximo merge. |

**Regras:**

- Nada de commit direto na `main`. Sempre PR, sempre revisado.
- `feature/*` e `fix/*` nascem de `development`. `hotfix/*` nasce de **`main`** (é a
  produção que está quebrada) e volta para as duas.
- Branch pequena e de vida curta. Quanto mais tempo aberta, mais conflito.
- Antes de abrir o PR da sua feature, atualize-a com a `development` (rebase ou
  merge) e resolva o conflito na **sua** branch — não no PR.
- Versão se marca com **tag** (`v1.0`), não com branch.
- **Nunca** `git reset --hard` / `push --force` na `development`. Com merge normal
  na `main` isso deixa de ser necessário — e já causou perda de trabalho aqui uma
  vez.

### Por que nunca dar squash de `development` → `main`

O squash **cria um commit novo**, com hash novo, que **não tem** os commits da
`development` como pais. A `main` fica com o mesmo *conteúdo*, mas sem *parentesco*.
No ciclo seguinte, a `development` continua achando que descende do commit antigo, o
Git tenta reaplicar tudo, e você recebe um conflito `add/add` absurdo em arquivos que
"já estavam certos".

Foi exatamente isso que aconteceu neste projeto. O remendo era resetar a
`development` a partir da `main` depois de cada release — disciplina extra, perigosa
(um reset fora de ordem apaga trabalho não mergeado) e que só existia para consertar
um problema que o próprio squash criou. **Merge normal na `main` e o problema deixa
de existir.** O squash continua onde ele é bom: no PR de feature.

### E a branch `release/*`?

O GitFlow clássico coloca uma `release/x.y` entre a `development` e a `main`. Ela
serve para **congelar** um conjunto de mudanças e estabilizar enquanto o time já
trabalha na versão seguinte. Faz sentido em produto versionado (ex: Arca). Não faz
sentido num site com deploy contínuo, onde a "release" é o próprio merge na `main`.

**Neste projeto: não usamos `release/*`.** Se um projeto futuro precisar congelar
versões, adota-se; a regra de merge acima continua valendo, com a `release` entrando
no lugar da `development` na terceira coluna.

---

## Checklist de code review

Antes de aprovar um componente ou página, confira:

- [ ] O componente **não tem conteúdo fixo** (textos/itens hardcoded), nem placeholder.
- [ ] Props de **conteúdo são obrigatórias**; só props de **layout** têm default.
- [ ] **Todo** o conteúdo está no `*.data.ts` da rota — inclusive os textos curtos.
- [ ] Os dados são **serializáveis** (string/número/array) — nada de JSX ou função
      (ícone entra por string, via `lib/icons.ts`).
- [ ] Toda `variant` **cabe num `cva()`**. Se ela muda a árvore HTML, vira componente.
- [ ] O componente está na gaveta certa: global → `layout/`; bloco → `sections/`;
      página inteira → `templates/`.
- [ ] O `page.tsx` lê como **composição** — dá pra entender o layout de relance.
- [ ] Código, props e comentários em **inglês**; conteúdo e rotas em **pt-BR**.
- [ ] O componente **não acopla** analytics/rotas/tipos específicos sem necessidade.
- [ ] Fornecedor de flags/analytics/CMS **não é importado direto** na UI — passa por
      uma interface do app (seção 11).
- [ ] O PR segue o fluxo da seção 12 (squash para `develop`, merge normal para `main`).
