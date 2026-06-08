"use server";

export async function sendBriefing(
  data: string,
  token: string,
  conversation: { role: string; content: string }[],
  contact: { nome: string; email: string; whatsapp: string }
) {
  const ok = await verifyTurnstile(token);
  if (!ok) return { success: false };

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

export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    }
  );

  const data = await res.json();
  return data.success === true;
}
