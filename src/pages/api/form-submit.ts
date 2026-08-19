import type { APIRoute } from "astro";
import {
  captureServerEvent,
  getPostHogRequestIds,
} from "@/lib/analytics/server";

type FormSubmitPayload = {
  formName?: string;
  pageUrl?: string;
  data?: Record<string, string>;
};

const PII_FIELDS = new Set(["name", "email", "message", "handover"]);

/**
 * Accepts the homepage enquiry POST so the UI does not 404.
 *
 * Logs the payload (visible in Vercel function logs) and returns `{ ok: true }`.
 * Does not send email. Replace with a mailer before treating enquiries as received.
 * When PostHog is configured, a non-PII conversion event is captured server-side.
 */
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const payload = await readBody(request);
  console.info("[form-submit stub]", payload);

  try {
    await captureEnquiry(request, payload);
  } catch (error) {
    console.error("[form-submit analytics]", error);
  }

  return Response.json({ ok: true });
};

async function captureEnquiry(
  request: Request,
  payload: unknown,
): Promise<void> {
  if (!isFormSubmitPayload(payload)) {
    return;
  }

  const { distinctId, sessionId } = getPostHogRequestIds(request);
  const data = payload.data ?? {};
  const properties: Record<string, unknown> = {
    form_name: payload.formName,
    $current_url: payload.pageUrl,
    $session_id: sessionId,
    source: "server",
    has_message: Boolean(data.message?.trim()),
  };

  for (const [key, value] of Object.entries(data)) {
    if (!PII_FIELDS.has(key) && value) {
      properties[key] = value;
    }
  }

  await captureServerEvent({
    distinctId: distinctId ?? crypto.randomUUID(),
    event: "enquiry_submitted",
    properties,
  });
}

function isFormSubmitPayload(value: unknown): value is FormSubmitPayload {
  return typeof value === "object" && value !== null;
}

async function readBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
