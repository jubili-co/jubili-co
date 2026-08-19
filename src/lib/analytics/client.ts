type PostHogBrowser = {
  capture: (event: string, properties?: Record<string, unknown>) => void;
  register: (properties: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    posthog?: PostHogBrowser;
  }
}

export function track(
  event: string,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") {
    return;
  }
  window.posthog?.capture(event, properties);
}

export function registerSiteLanguage(language: "de" | "en"): void {
  if (typeof window === "undefined") {
    return;
  }
  window.posthog?.register({ site_language: language });
}
