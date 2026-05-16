/**
 * Simulador de fluxo completo do chatbot Wize
 *
 * Uso:
 *   npx tsx eval-conversation/run.ts              → roda todas as personas
 *   npx tsx eval-conversation/run.ts padaria-leigo → roda só essa persona
 *
 * Personas disponíveis:
 *   padaria-leigo | tecnico-cto | disperso-offtopic | impaciente-preco | vago-inseguro
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { systemPrompt } from "../lib/chat/system-prompt";

// ── Config ────────────────────────────────────────────────────────────────────

const OPENROUTER_BASE = "https://openrouter.ai/api/v1";
const WIZE_MODEL = "google/gemini-2.0-flash-lite-001";
const CLIENT_MODEL = "google/gemini-2.0-flash-lite-001";
const MAX_TURNS = 25;
const RESULTS_DIR = join(process.cwd(), "eval-conversation", "results");

const BRIEFING_REGEX = /<briefing>([\s\S]*?)<\/briefing>/;

const VALID_CATEGORIES = [
  "Site institucional",
  "Landing page",
  "Automação",
  "Dashboard / BI",
  "Workflow (automação de processos)",
  "Aplicativo mobile",
  "Sistema web personalizado",
  "Outro",
];

const REQUIRED_FIELDS = [
  "empresa",
  "segmento",
  "problema_principal",
  "projeto_descricao",
  "funcionalidades_essenciais",
  "classificacao_servico",
];

// ── Colors ────────────────────────────────────────────────────────────────────

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  blue: "\x1b[34m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  gray: "\x1b[90m",
};

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Persona {
  id: string;
  label: string;
  clientPrompt: string;
  firstMessage: string;
}

interface Turn {
  role: "client" | "wize";
  text: string;
}

interface EvaluationResult {
  passed: boolean;
  turnCount: number;
  checks: Record<string, boolean>;
}

// ── Personas ──────────────────────────────────────────────────────────────────

const personas: Persona[] = [
  {
    id: "padaria-leigo",
    label: "Dono de padaria — leigo em tecnologia",
    firstMessage: "oi, quero fazer um site pra minha padaria",
    clientPrompt: `Você é o dono de uma padaria artesanal chamada "Pão de Mel". Tem 45 anos e não entende nada de tecnologia, mas quer um site para mostrar o cardápio e receber pedidos pelo WhatsApp.
Responda de forma curta e informal, como numa conversa de WhatsApp. Use vírgulas, não ponto final. Frases simples.
Se perguntarem algo técnico, diga que não entende muito disso.
Sobre orçamento: tem uns 3 mil reais disponíveis mas não quer falar isso logo.
Seu prazo: queria pra antes do dia das mães.`,
  },
  {
    id: "tecnico-cto",
    label: "CTO — cliente técnico e objetivo",
    firstMessage:
      "preciso de um sistema interno de gestão de projetos com API REST, integração com Jira e dashboard em tempo real",
    clientPrompt: `Você é o CTO de uma startup de logística com 40 funcionários.
Precisa de um sistema interno para gestão de projetos da equipe de engenharia, integrado ao Jira e Slack, com dashboard de métricas em tempo real.
Seja direto e técnico. Respostas curtas e objetivas. Use termos como API, webhook, OAuth2, SLA, etc.
Orçamento: entre 40k e 80k. Prazo: 4 meses.
Se perguntarem algo sobre o negócio, responda de forma técnica mas clara.`,
  },
  {
    id: "disperso-offtopic",
    label: "Cliente disperso — sai do assunto no meio do fluxo",
    firstMessage: "oi, minha sócia disse que a gente precisa de um site",
    clientPrompt: `Você tem uma clínica de estética chamada "Estética Bella" e quer um site com agendamento online.
Responda normalmente as perguntas, mas em 2 momentos aleatórios da conversa mande uma mensagem completamente fora do contexto — por exemplo: perguntar o horário de atendimento da empresa, reclamar do calor, ou dizer que mandou no grupo errado.
Depois volte normalmente ao assunto sem explicar. Seja simpática e um pouco desorganizada.
Respostas curtas, linguagem informal. Orçamento: não sabe. Prazo: sem urgência.`,
  },
  {
    id: "impaciente-preco",
    label: "Cliente impaciente — quer preço e prazo imediatos",
    firstMessage: "quanto custa fazer um aplicativo de delivery? preciso urgente",
    clientPrompt: `Você quer um app de delivery para seu restaurante de comida japonesa "Sushi Zen".
Está com muita pressa pois o concorrente já tem um app. Quer saber logo o preço e o prazo antes de qualquer coisa.
Se não receber um valor logo, fica um pouco impaciente mas não é grosseiro.
Se o assistente explicar bem o processo, você cede e vai respondendo as perguntas.
Orçamento: "quanto precisar", mas na verdade tem uns 15k. Prazo: 1 mês (irreal, mas é o que você pede).`,
  },
  {
    id: "vago-inseguro",
    label: "Cliente vago — respostas sem detalhes, muito inseguro",
    firstMessage: "quero algo digital pra melhorar meu negócio",
    clientPrompt: `Você tem uma pequena empresa de consultoria de RH mas não sabe explicar bem o que precisa.
Todas as suas respostas são vagas: "não sei", "talvez", "pode ser", "acho que sim", "não tenho certeza".
Se pedirem exemplos, dê algo genérico como "algo que facilite o trabalho".
Você não entende de tecnologia e fica inseguro ao responder. Deixe o assistente guiar.
Só quando perguntarem diretamente sobre orçamento, diga "tenho uns 5 mil disponíveis".`,
  },
];

// ── API ───────────────────────────────────────────────────────────────────────

async function callModel(
  model: string,
  system: string,
  messages: Message[],
  sessionId: string
): Promise<string> {
  const apiKey = "OPENROUTER_API_KEY_REMOVED";
  if (!apiKey) throw new Error("OPENROUTER_API_KEY não está definida");

  const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://wizecode.com.br",
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      session_id: sessionId,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${err}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string | null } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error(`Model returned empty content (${model})`);
  return content;
}

// ── Evaluation ────────────────────────────────────────────────────────────────

function evaluateBriefing(
  json: Record<string, unknown>,
  turnCount: number
): EvaluationResult {
  const checks: Record<string, boolean> = {};

  for (const field of REQUIRED_FIELDS) {
    const val = json[field];
    checks[`campo_${field}`] =
      val !== "" &&
      val !== null &&
      val !== undefined &&
      !(Array.isArray(val) && val.length === 0);
  }

  checks.categoria_valida = VALID_CATEGORIES.some((cat) =>
    String(json.classificacao_servico ?? "").includes(cat)
  );

  checks.dentro_do_limite = turnCount <= MAX_TURNS;

  return {
    passed: Object.values(checks).every(Boolean),
    turnCount,
    checks,
  };
}

// ── Print helpers ─────────────────────────────────────────────────────────────

function printTurn(role: "client" | "wize", text: string, turn: number) {
  const isClient = role === "client";
  const label = isClient
    ? `${c.blue}${c.bold}👤 Cliente [${turn}]${c.reset}`
    : `${c.magenta}${c.bold}🤖 Wize   [${turn}]${c.reset}`;
  const color = isClient ? c.blue : c.magenta;

  console.log(`\n${label}`);
  for (const line of text.split("\n")) {
    console.log(`   ${color}${line}${c.reset}`);
  }
}

function printEvaluation(ev: EvaluationResult) {
  const status = ev.passed
    ? `${c.green}✅ PASSOU${c.reset}`
    : `${c.red}❌ FALHOU${c.reset}`;

  console.log(
    `\n${c.bold}━━━ Avaliação do Briefing ${status} ${c.gray}(${ev.turnCount} turnos)${c.reset}`
  );

  for (const [key, ok] of Object.entries(ev.checks)) {
    const icon = ok ? `${c.green}✓${c.reset}` : `${c.red}✗${c.reset}`;
    console.log(`   ${icon} ${key}`);
  }
}

// ── Markdown report ───────────────────────────────────────────────────────────

function buildReport(
  persona: Persona,
  turns: Turn[],
  briefingRaw: string | null,
  evaluation: EvaluationResult | null
): string {
  const now = new Date().toLocaleString("pt-BR");
  let md = `# Simulação: ${persona.label}\n\n`;
  md += `**Data:** ${now}  \n`;
  md += `**Modelo Wize:** \`${WIZE_MODEL}\`  \n`;
  md += `**Modelo Cliente:** \`${CLIENT_MODEL}\`  \n`;
  md += `**Turnos:** ${turns.filter((t) => t.role === "client").length}  \n\n`;
  md += `---\n\n## Conversa\n\n`;

  let turnNum = 0;
  for (const turn of turns) {
    if (turn.role === "client") turnNum++;
    const label =
      turn.role === "client"
        ? `**👤 Cliente** *(turno ${turnNum})*`
        : `**🤖 Wize** *(turno ${turnNum})*`;
    md += `${label}\n\n> ${turn.text.replace(/\n/g, "\n> ")}\n\n---\n\n`;
  }

  if (briefingRaw) {
    md += `## Briefing Gerado\n\n\`\`\`json\n${briefingRaw}\n\`\`\`\n\n`;
  } else {
    md += `## Briefing\n\n⚠️ Nenhum briefing detectado na conversa.\n\n`;
  }

  if (evaluation) {
    md += `## Avaliação\n\n`;
    md += `**Resultado:** ${evaluation.passed ? "✅ Passou" : "❌ Falhou"}  \n`;
    md += `**Turnos:** ${evaluation.turnCount}  \n\n`;
    for (const [key, ok] of Object.entries(evaluation.checks)) {
      md += `- ${ok ? "✅" : "❌"} \`${key}\`\n`;
    }
  }

  return md;
}

// ── Conversation loop ─────────────────────────────────────────────────────────

async function runConversation(persona: Persona): Promise<void> {
  console.log(
    `\n${c.cyan}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`
  );
  console.log(`${c.cyan}${c.bold}  ${persona.label}${c.reset}`);
  console.log(
    `${c.cyan}${c.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.reset}`
  );

  const sessionId = `wize-eval-${persona.id}-${Date.now()}`;
  const wizeHistory: Message[] = [];
  const clientHistory: Message[] = [];
  const turns: Turn[] = [];

  let briefingRaw: string | null = null;
  let currentClientMessage = persona.firstMessage;
  let turnNum = 0;

  while (turnNum < MAX_TURNS) {
    turnNum++;

    // — Cliente fala —
    printTurn("client", currentClientMessage, turnNum);
    turns.push({ role: "client", text: currentClientMessage });
    wizeHistory.push({ role: "user", content: currentClientMessage });

    // — Wize responde —
    process.stdout.write(
      `\n${c.magenta}${c.bold}🤖 Wize   [${turnNum}]${c.reset}  ${c.dim}gerando...${c.reset}`
    );
    const wizeResponse = await callModel(WIZE_MODEL, systemPrompt, wizeHistory, sessionId);
    process.stdout.write("\r\x1b[K");
    printTurn("wize", wizeResponse, turnNum);

    wizeHistory.push({ role: "assistant", content: wizeResponse });
    // clientHistory: Wize's message is the "user" stimulus the client responds to
    clientHistory.push({ role: "user", content: wizeResponse });
    turns.push({ role: "wize", text: wizeResponse });

    // — Verifica briefing —
    const match = wizeResponse.match(BRIEFING_REGEX);
    if (match) {
      briefingRaw = match[1].trim();
      console.log(
        `\n${c.green}${c.bold}✅ Briefing detectado no turno ${turnNum}${c.reset}`
      );
      break;
    }

    if (turnNum >= MAX_TURNS) {
      console.log(
        `\n${c.yellow}⚠️  Limite de ${MAX_TURNS} turnos atingido sem briefing.${c.reset}`
      );
      break;
    }

    // — Cliente gera próxima mensagem —
    process.stdout.write(`   ${c.dim}cliente digitando...${c.reset}`);
    currentClientMessage = await callModel(
      CLIENT_MODEL,
      persona.clientPrompt,
      clientHistory,
      sessionId
    );
    // clientHistory: push generated client message as "assistant" (what the model produces)
    clientHistory.push({ role: "assistant", content: currentClientMessage });
    process.stdout.write("\r\x1b[K");
  }

  // — Avalia briefing —
  let evaluation: EvaluationResult | null = null;
  if (briefingRaw) {
    try {
      const json = JSON.parse(briefingRaw) as Record<string, unknown>;
      evaluation = evaluateBriefing(json, turnNum);
      printEvaluation(evaluation);
    } catch {
      console.log(`\n${c.red}❌ Briefing com JSON inválido.${c.reset}`);
    }
  }

  // — Salva relatório —
  if (!existsSync(RESULTS_DIR)) mkdirSync(RESULTS_DIR, { recursive: true });
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .slice(0, 19);
  const filename = `${persona.id}-${timestamp}.md`;
  writeFileSync(join(RESULTS_DIR, filename), buildReport(persona, turns, briefingRaw, evaluation));
  console.log(
    `\n${c.gray}📄 Relatório: eval-conversation/results/${filename}${c.reset}`
  );
}

// ── Entry point ───────────────────────────────────────────────────────────────

async function main() {
  const arg = process.argv[2];
  const toRun = arg ? personas.filter((p) => p.id === arg) : personas;

  if (toRun.length === 0) {
    console.error(`\nPersona "${arg}" não encontrada. Disponíveis:\n`);
    for (const p of personas) console.error(`  ${c.cyan}${p.id}${c.reset}  — ${p.label}`);
    console.error();
    process.exit(1);
  }

  for (const persona of toRun) {
    await runConversation(persona);
  }

  console.log(
    `\n${c.green}${c.bold}Concluído!${c.reset} Relatórios em ${c.cyan}eval-conversation/results/${c.reset}\n`
  );
}

main().catch((err: Error) => {
  console.error(`\n${c.red}Erro:${c.reset}`, err.message);
  process.exit(1);
});
