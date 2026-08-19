import type { APIRoute } from "astro";

/**
 * Accepts the homepage enquiry POST so the UI does not 404.
 *
 * Logs the payload (visible in Vercel function logs) and returns `{ ok: true }`.
 * Does not send email. Replace with a mailer before treating enquiries as received.
 */
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const payload = await readBody(request);
  console.info("[form-submit stub]", payload);
  return Response.json({ ok: true });
};

async function readBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
