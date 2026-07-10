"use server";

import { verifyTurnstile } from "@/lib/turnstile/actions";
import { lerEnv } from "@/lib/env";

export async function sendBriefing(
  data: string,
  token: string,
  conversation: { role: string; content: string }[],
  contact: { nome: string; email: string; whatsapp: string }
) {
  if (process.env.NODE_ENV !== "development") {
    if (!token || !(await verifyTurnstile(token))) return { success: false };
  }

  const webhookBase = lerEnv("N8N_WEBHOOK_URL", "briefing");
  if (!webhookBase) return { success: false };

  const secret = lerEnv("N8N_WEBHOOK_SECRET", "briefing");
  if (!secret) return { success: false };

  try {
    const res = await fetch(`${webhookBase}/briefing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": secret,
      },
      body: JSON.stringify({
        briefing: JSON.parse(data),
        conversa: conversation,
        contato: contact,
      }),
    });
    if (!res.ok) {
      const detalhe = await res.text().catch(() => "");
      console.error(`[briefing] webhook n8n respondeu ${res.status}: ${detalhe}`);
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.error("[briefing] falha ao chamar webhook n8n:", err);
    return { success: false };
  }
}
