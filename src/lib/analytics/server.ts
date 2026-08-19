import { PostHog } from "posthog-node";
import {
  getPostHogIngestHost,
  getPostHogProjectToken,
  isPostHogConfigured,
} from "./config";

let client: PostHog | null = null;

export function getPostHogServer(): PostHog | null {
  if (!isPostHogConfigured()) {
    return null;
  }
  if (!client) {
    client = new PostHog(getPostHogProjectToken(), {
      host: getPostHogIngestHost(),
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return client;
}

export function getPostHogRequestIds(request: Request): {
  distinctId: string | undefined;
  sessionId: string | undefined;
} {
  return {
    distinctId: request.headers.get("x-posthog-distinct-id") ?? undefined,
    sessionId: request.headers.get("x-posthog-session-id") ?? undefined,
  };
}

export async function captureServerEvent({
  distinctId,
  event,
  properties,
}: {
  distinctId: string;
  event: string;
  properties?: Record<string, unknown>;
}): Promise<void> {
  const posthog = getPostHogServer();
  if (!posthog) {
    return;
  }

  posthog.capture({
    distinctId,
    event,
    properties,
  });
  await posthog.flush();
}
