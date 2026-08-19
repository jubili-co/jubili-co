const EU_INGEST_HOST = "https://eu.i.posthog.com";
const EU_ASSET_HOST = "https://eu-assets.i.posthog.com";
const US_ASSET_HOST = "https://us-assets.i.posthog.com";
const EU_UI_HOST = "https://eu.posthog.com";
const US_UI_HOST = "https://us.posthog.com";

/**
 * First-party proxy path. Keep this boring and brand-specific — blockers
 * target names like `/posthog`, `/analytics`, `/ingest`, and `/telemetry`.
 * Must stay in sync with `vercel.json`.
 */
export const POSTHOG_PROXY_PATH = "/jbl";

export function getPostHogProjectToken(): string {
  return import.meta.env.PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() ?? "";
}

export function isPostHogConfigured(): boolean {
  return getPostHogProjectToken().length > 0;
}

export function getPostHogIngestHost(): string {
  const configured = import.meta.env.PUBLIC_POSTHOG_HOST?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }
  return EU_INGEST_HOST;
}

export function isPostHogUsRegion(host = getPostHogIngestHost()): boolean {
  return host.includes("us.i.posthog.com") || host.includes("us.posthog.com");
}

export function getPostHogAssetHost(): string {
  return isPostHogUsRegion() ? US_ASSET_HOST : EU_ASSET_HOST;
}

export function getPostHogUiHost(): string {
  return isPostHogUsRegion() ? US_UI_HOST : EU_UI_HOST;
}

export function getPostHogProxyPath(): string {
  return POSTHOG_PROXY_PATH;
}
