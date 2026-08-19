import type { APIRoute } from "astro";

/**
 * Accepts homepage `sendBeacon` events so they do not 404.
 *
 * Returns 204. Does not store or forward events. Wire an analytics product
 * when tracking is needed.
 */
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const raw = await request.text();
  console.info("[ingest stub]", raw);
  return new Response(null, { status: 204 });
};
