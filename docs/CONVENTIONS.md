# Convenções de Componentes e Páginas

> Como estruturamos componentes e páginas neste projeto — e por quê.
> Este documento é a referência oficial da equipe. Leia antes de criar um
> componente novo ou uma página nova.

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
<Hero title="Bem-vindo à WizeCode" />
```

---

## 2. A linha entre "conteúdo" e "componente"

A pergunta que sempre aparece em code review: *"isso é conteúdo (vai pra página)
ou é do componente (fica dentro)?"*. Use esta régua:

| Vai para a **página / dados** (conteúdo) | Fica no **componente** (estrutura/comportamento) |
| --- | --- |
| Textos: títulos, descrições, labels | Arranjo/layout (`flex`, `grid`, breakpoints) |
| Itens de lista (serviços, projetos, FAQ) | Tipografia e espaçamento do esqueleto |
| Imagens (`src`, `alt`) e `href` | Animações e transições |
| Dados de apresentação atrelados ao conteúdo (ex: a `color` de cada card de serviço) | Comportamento (ex: qual card está ativo no hover) |
| Nomes/labels de CTA e seus destinos | Integrações técnicas (analytics, telemetria) |

**Casos de borda resolvidos (para não brigar em PR):**

- **A `color` de um serviço** é dado do conteúdo → vai com o conteúdo, na página/dados.
- **O evento de analytics** (`posthog.capture(...)`) é comportamento → fica no
  componente. (Exceção: se o componente for virar biblioteca compartilhada, veja
  a seção 7.)

Regra de bolso: **se muda quando você usa o componente em outra página, é
conteúdo.** Se é sempre igual em qualquer página, é do componente.

---

## 3. Props obrigatórias, sem valor padrão

Esta é a regra que faz a convenção **se fiscalizar sozinha**.

Componentes de layout **não** definem defaults de conteúdo. As props de conteúdo
são **obrigatórias**. Assim, se uma página esquecer de passar o conteúdo, o
TypeScript reclama — e o erro aparece no editor, não em produção.

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
    variant?: "default" | "reversed" | "centered" // ok: default de layout
    title: React.ReactNode                        // obrigatória: conteúdo
}
```

---

## 4. Onde o conteúdo mora

O conteúdo mora **com a página**, mas nem tudo no mesmo arquivo:

- **Texto curto** (título e descrição de um hero) pode ir *inline* no `page.tsx`.
- **Conteúdo pesado** (arrays de serviços, projetos, FAQ, logos) vai para um
  **módulo de dados co-localizado**: um arquivo `*.data.ts` ao lado da página.

Por quê separar os dados pesados: se você despejar arrays de 100 linhas dentro do
`page.tsx`, o arquivo vira um paredão e perde a leitura. O `.data.ts` mantém o
`page.tsx` legível (ele mostra a *composição*) e isola o conteúdo num lugar óbvio.

```
app/
  servicos/
    page.tsx          ← compõe a página (Section + componentes)
    servicos.data.ts  ← o conteúdo desta página (arrays, textos)
```

```tsx
// app/servicos/servicos.data.ts
export const servicosContent = {
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
import { servicosContent } from "./servicos.data"

export default function Page() {
    return (
        <Section>
            <Servicos
                badge={servicosContent.hero.badge}
                heading={servicosContent.hero.title}
                services={servicosContent.services}
            />
        </Section>
    )
}
```

**Horizonte de evolução:** no dia em que um não-dev (marketing/comercial)
precisar editar textos sem tocar em código, a fonte do conteúdo migra de
`.data.ts` para um CMS (Sanity, Contentful, Payload) ou MDX. Como o componente já
é puro e o conteúdo já está isolado, essa migração é trivial — troca-se a fonte do
dado e o componente nem fica sabendo. O `.data.ts` é o degrau certo antes disso.

### Caso especial: quando o "conteúdo" é um componente (ícones)

Às vezes um dado de conteúdo aponta para um **componente** — o caso típico é um
ícone (`Brain`, `FaWhatsapp`). Bater o componente direto nos dados parece natural,
mas esbarra em duas paredes:

1. **A fronteira Server → Client.** O `page.tsx` (Server Component) lê o `.data.ts`
   e passa para componentes de seção (Client Components). O React **proíbe passar
   funções** por essa fronteira — e um ícone é uma função. O build quebra com
   *"Functions cannot be passed directly to Client Components"*.
2. **O futuro CMS.** Um CMS jamais armazena a função `Brain`; ele guarda a string
   `"brain"`. Se o conteúdo um dia vier de fora, ele já **tem** que ser string.

A solução é um **registro central**: os dados referenciam o ícone por string, e um
único mapa `string → componente` faz a tradução.

```ts
// lib/icons.ts — a paleta de ícones disponíveis
import { Brain } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export const icons = { brain: Brain, whatsapp: FaWhatsapp /* ... */ } as const
export type IconName = keyof typeof icons
```

```ts
// home.data.ts — conteúdo referencia por string (atravessa a fronteira, CMS-ready)
{ letter: "W", title: "Wisdom", icon: "brain" }
```

```tsx
// diferenciais.tsx — o componente traduz string → componente
import { icons, type IconName } from "@/lib/icons"
const Icon = icons[item.icon] // item.icon: IconName
```

Adicionar um ícone **novo** (que nunca foi usado) custa **uma linha** em
`lib/icons.ts` — não é "mexer no componente", é ampliar o catálogo. Reusar um ícone
que já existe é só editar os dados. O registro é a **fronteira controlada** da
seção 8 aplicada a ícones: os dados dependem de uma string estável, não do SDK de
uma biblioteca de ícones.

---

## 5. Estrutura de arquivos

```
components/
  ui/                 ← primitivos (shadcn/ui): Button, Badge, Terminal…
  layout/
    section.tsx       ← wrapper de seção (estrutura: <section> + container)
    hero.tsx          ← hero unificado (esqueleto, conteúdo via props)
    home/             ← seções (esqueletos puros, conteúdo via props)
      servicos.tsx
      faq.tsx
      ...

app/
  page.tsx            ← compõe a home
  home.data.ts        ← conteúdo da home
  servicos/
    page.tsx
    servicos.data.ts
```

- `components/ui/*` — primitivos apresentacionais (já é assim, é o shadcn).
- `components/layout/*` — componentes de seção/estrutura, **também** apresentacionais.
- `app/**/page.tsx` — a camada de composição: escolhe componentes, injeta conteúdo.
- `app/**/*.data.ts` — o conteúdo daquela rota.

---

## 6. Exemplo trabalhado — a home

### `Section` — a estrutura repetida vira um componente

Toda seção compartilha o mesmo esqueleto (`<section>` + `container mx-auto` +
espaçamento). Em vez de repetir isso em cada componente, centralizamos:

```tsx
// components/layout/section.tsx
interface SectionProps {
    children: React.ReactNode
    className?: string
    variant?: "default" | "soft" | "accent" // fundo/moldura
    backdrop?: React.ReactNode               // camada full-bleed (ex: Particles)
}
```

- `variant` controla o **fundo** (default sem fundo, `soft`/`accent` são cards).
- Espaçamento (`my-8`/`py-8`) é default, ajustável por `className` no ponto de uso
  (o utilitário `cn` usa `tailwind-merge`, então `className` sobrescreve limpo).

### `Hero` — variação de layout por `variant`, conteúdo por props

```tsx
// components/layout/hero.tsx
interface HeroProps {
    variant?: "default" | "reversed" | "centered" // arranjo (default de layout)
    badge?: string
    title: React.ReactNode      // obrigatória: conteúdo
    description?: React.ReactNode
    cta?: { primary?: ...; secondary?: ... }
    children?: React.ReactNode  // slot de mídia (terminal, imagem)
}
```

O `variant` escolhe o arranjo; as props trazem o conteúdo; a mídia entra por
`children`. O mesmo `Hero` serve a home (com um terminal) e uma página interna
(com uma imagem) — sem duplicar estrutura.

### A página compõe

```tsx
// app/page.tsx (trecho) — conteúdo pesado vem de home.data.ts
import { home } from "./home.data"

<Section className="my-0 sm:py-16">
    <Hero
        badge="/ Hero"
        title={<>Tecnologia <span className="text-accent">inteligente</span>…</>}
        cta={{ primary: { text: "Fale com nossa equipe", url: "/contato" } }}
    >
        <Terminal>…</Terminal>
    </Hero>
</Section>

<Section variant="soft">
    <Servicos heading={home.servicos.heading} services={home.servicos.services} />
</Section>
<Section variant="accent" backdrop={<Particles … />}>
    <Contato heading={home.contato.heading} infoCards={home.contato.infoCards} />
</Section>
```

A página lê como uma **composição**: dá para ver o layout inteiro de relance, e o
conteúdo de cada seção está onde faz sentido — na página, não escondido no componente.

---

## 7. Horizonte: biblioteca de componentes da empresa

Estes componentes tendem a virar uma **biblioteca compartilhada entre projetos**.
Para um componente sobreviver a essa mudança, ele **não pode ter acoplamento a algo
específico de um app**. Quando extrair um componente para a lib, remova:

- **Analytics direto** (`usePostHog`, `posthog.capture`) → troque por um callback
  opcional: `onCtaClick?: () => void`. Quem usa decide o que rastrear.
- **Rotas fixas** (`/servicos/institucional`) → sempre via props (`href`).
- **Tipos específicos do app** (`@/types/services`) → o componente define sua
  própria interface mínima; o app faz o mapeamento.

Não precisamos fazer isso agora — mas todo componente novo já deve ser escrito
pensando nesse horizonte: **quanto menos ele souber sobre este app específico,
mais longe ele viaja.**

---

## 8. Fronteiras com fornecedores: evitando lock-in (flags, analytics, CMS)

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

### Na prática — o fornecedor fica atrás de um adaptador

```ts
// lib/flags/types.ts — SEU contrato. Não pertence a vendor nenhum.
export interface FlagProvider {
    variant(key: string, visitorId: string): Promise<string>
}
```

```ts
// lib/flags/providers/*.ts — os adaptadores (escritos quando precisar)
export const posthogProvider: FlagProvider = { /* chama posthog */ }
export const vercelProvider:  FlagProvider = { /* chama vercel flags */ }
export const staticProvider:  FlagProvider = { /* env/config, zero vendor */ }
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

### Analytics segue a MESMA regra

Hoje o app importa `usePostHog` direto dentro de componentes (ex:
[hero.tsx](../components/layout/hero.tsx)). Isso é o mesmo lock-in, na camada de
analytics: trocar PostHog por outro fornecedor amanhã exigiria caçar em N
componentes. O alvo é um `analytics.track(evento, props)` do app, com PostHog
atrás como adaptador — e o componente recebendo um callback (`onClick`), sem
conhecer o fornecedor. Ver seção 7.

### O que fazer agora: adote a regra, escreva o código depois

Não construa a abstração antes de ter um consumidor real — isso é
over-engineering. O custo hoje é **uma frase de política** (esta seção). O
benefício é: quando você adicionar flags ou trocar de analytics, já adiciona a
interface no dia 1, nunca chama o vendor direto da UI. Zero refatoração futura.

---

## Checklist de code review

Antes de aprovar um componente ou página, confira:

- [ ] O componente de layout **não tem conteúdo fixo** (textos/itens hardcoded).
- [ ] Props de **conteúdo são obrigatórias**; só props de **layout** têm default.
- [ ] O conteúdo está na **página** (texto curto inline; dado pesado em `*.data.ts`).
- [ ] O `page.tsx` lê como **composição** — dá pra entender o layout de relance.
- [ ] O componente **não acopla** analytics/rotas/tipos específicos sem necessidade.
- [ ] Fornecedor de flags/analytics/CMS **não é importado direto** na UI — passa por
      uma interface do app (seção 8).
