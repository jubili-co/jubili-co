/**
 * Posts the homepage enquiry to `/api/form-submit`.
 *
 * That route logs the payload and returns `{ ok: true }`. It does not send
 * email. See `src/pages/api/form-submit.ts`.
 */
export async function submitForm(
  formName: string,
  data: Record<string, string>,
): Promise<{ ok: boolean }> {
  const response = await fetch("/api/form-submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formName, pageUrl: window.location.href, data }),
    keepalive: true,
  });
  if (!response.ok) {
    throw new Error(`Form submission failed (${response.status})`);
  }
  return { ok: true };
}
