"use server";

export async function sendBriefing(
  data: string,
  token: string,
  conversation: { role: string; content: string }[]
) {
  const ok = await verifyTurnstile(token);
  if (!ok) return;

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      briefing: JSON.parse(data),
      conversa: conversation,
    }),
  });
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
