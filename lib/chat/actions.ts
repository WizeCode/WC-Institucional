"use server";

import { verifyTurnstile } from "@/lib/turnstile/actions";

export async function sendBriefing(
  data: string,
  token: string,
  conversation: { role: string; content: string }[],
  contact: { nome: string; email: string; whatsapp: string }
) {
  if (process.env.NODE_ENV !== "development") {
    if (!token || !(await verifyTurnstile(token))) return { success: false };
  }

  const webhookBase = process.env.N8N_WEBHOOK_URL;
  if (!webhookBase) return { success: false };

  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (!secret) return { success: false };

  try {
    await fetch(`${webhookBase}/briefing`, {
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
    return { success: true };
  } catch {
    return { success: false };
  }
}
