# WizeCode — Site Institucional

Site institucional da **WizeCode**, desenvolvido em Next.js. Apresenta os serviços,
cases e diferenciais da empresa, além de um chatbot de briefing ("Wizard") e
formulários de contato integrados ao CRM.

---

## ✨ Funcionalidades

- **Home dinâmica** — Hero animado, seções de Serviços, Diferenciais, Portfólio,
  Stack, Parceiros e FAQ.
- **Chatbot "Wizard"** — assistente de briefing com fluxo de onboarding, proteção
  contra bots (Cloudflare Turnstile) e envio das conversas para o CRM.
- **Formulários de contato** — integração com n8n e Frappe CRM.
- **SEO completo** — metadata, Open Graph, `sitemap.xml`, `robots.txt` e dados
  estruturados (JSON-LD).
- **Analytics** — rastreamento de eventos com PostHog e Vercel Speed Insights.
- **Tema claro/escuro** — alternância de tema com persistência.
- **Design responsivo** — layout adaptado para mobile, tablet e desktop.

---

## 🛠️ Stack

| Camada        | Tecnologias                                                        |
| ------------- | ------------------------------------------------------------------ |
| Framework     | [Next.js 16](https://nextjs.org/) (App Router) + React 19          |
| Linguagem     | TypeScript                                                         |
| Estilização   | Tailwind CSS v4, `tw-animate-css`                                  |
| UI            | shadcn/ui, Radix UI, lucide-react                                  |
| Animações     | Motion (Framer Motion)                                             |
| IA / Chatbot  | Vercel AI SDK + OpenRouter                                         |
| Integrações   | n8n / Frappe CRM (webhooks), Cloudflare Turnstile                  |
| Analytics     | PostHog, Vercel Speed Insights                                     |
| Formulários   | React Hook Form + Zod                                              |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 20+ (recomendado)
- npm

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local   # e preencha os valores (veja a seção abaixo)

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

O site ficará disponível em [http://localhost:3000](http://localhost:3000).

---

## 🔑 Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes chaves:

| Variável                          | Descrição                                              |
| --------------------------------- | ------------------------------------------------------ |
| `OPENROUTER_API_KEY`              | Chave de API do OpenRouter (chatbot Wizard).           |
| `OPENROUTER_MODEL`                | Modelo usado pelo chatbot (ex.: `anthropic/claude-...`).|
| `N8N_WEBHOOK_URL`                 | URL do webhook do n8n (contato/chatbot → CRM).         |
| `N8N_WEBHOOK_SECRET`              | Segredo para autenticar as chamadas ao webhook.        |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | Token público do projeto no PostHog.                 |
| `NEXT_PUBLIC_POSTHOG_HOST`        | Host da instância do PostHog.                          |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`  | Site key do Cloudflare Turnstile (pública).            |
| `TURNSTILE_SECRET_KEY`            | Secret key do Cloudflare Turnstile (privada).          |

> ⚠️ **Nunca commite segredos.** Use `.env.local` (ignorado pelo Git) para valores
> reais. Variáveis com prefixo `NEXT_PUBLIC_` são expostas no cliente — não coloque
> segredos nelas.

---

## 📜 Scripts

| Comando             | Descrição                                              |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Servidor de desenvolvimento (Turbopack).               |
| `npm run build`     | Build de produção.                                     |
| `npm run start`     | Sobe o build de produção.                              |
| `npm run lint`      | Executa o ESLint.                                      |
| `npm run format`    | Formata o código com Prettier.                         |
| `npm run typecheck` | Verifica os tipos com o TypeScript.                    |
| `npm run eval`      | Roda as avaliações de conversa do chatbot.             |

Avaliações específicas do chatbot: `eval:padaria`, `eval:cto`, `eval:disperso`,
`eval:impaciente`, `eval:vago`.

---

## 📁 Estrutura do projeto

```
app/                 # Rotas (App Router): home, serviços, cases, contato, chat, legais…
  api/chat/          # Endpoint do chatbot
  sitemap.ts         # Geração do sitemap
  robots.ts          # Geração do robots.txt
  manifest.ts        # Web manifest (PWA)
components/
  layout/            # Header, footer e seções da home
  chat/              # Chatbot Wizard e diálogos
  forms/             # Formulários de contato
  ui/                # Componentes base (shadcn/ui)
  seo/               # JSON-LD e helpers de SEO
hooks/               # Hooks customizados
lib/                 # Utilitários
types/               # Tipos compartilhados
public/              # Imagens, ícones e logos
eval-conversation/   # Avaliações automatizadas do chatbot
```

---

## 🌐 Rotas principais

| Rota                        | Descrição                          |
| --------------------------- | ---------------------------------- |
| `/`                         | Home                               |
| `/sobre`                    | Sobre a WizeCode                   |
| `/servicos/*`               | Páginas de serviços                |
| `/cases`                    | Cases / portfólio                  |
| `/contato`                  | Formulário de contato              |
| `/chat`                     | Chatbot Wizard                     |
| `/trabalhe-conosco`         | Trabalhe conosco                   |
| `/termos-de-uso`            | Termos de Uso                      |
| `/politica-de-privacidade`  | Política de Privacidade            |

---

## 📦 Deploy

O projeto é otimizado para deploy na [Vercel](https://vercel.com/). Configure as
variáveis de ambiente no painel do projeto antes do deploy de produção.

---

© WizeCode. Todos os direitos reservados.
