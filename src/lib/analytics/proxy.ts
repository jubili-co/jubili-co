import type { APIContext } from "astro";
import {
  getPostHogAssetHost,
  getPostHogIngestHost,
  isPostHogConfigured,
} from "./config";

const HOP_BY_HOP = new Set([
  "connection",
  "content-length",
  "host",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

function isAssetPath(path: string): boolean {
  return path.startsWith("/static/") || path.startsWith("/array/");
}

function copyHeaders(source: Headers): Headers {
  const headers = new Headers();
  for (const [key, value] of source.entries()) {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  }
  return headers;
}

function resolveUpstream(path: string, search: string): URL | null {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return null;
  }

  const origin = isAssetPath(normalized)
    ? getPostHogAssetHost()
    : getPostHogIngestHost();
  const upstream = new URL(normalized + search, origin);

  if (upstream.origin !== new URL(origin).origin) {
    return null;
  }

  return upstream;
}

export async function proxyPostHogRequest({
  params,
  request,
  url,
}: APIContext): Promise<Response> {
  if (!isPostHogConfigured()) {
    return new Response(null, { status: 404 });
  }

  const rest = Array.isArray(params.path)
    ? params.path.join("/")
    : (params.path ?? "");
  const upstream = resolveUpstream(rest, url.search);
  if (!upstream) {
    return new Response(null, { status: 404 });
  }

  const method = request.method.toUpperCase();
  const hasBody = method !== "GET" && method !== "HEAD" && method !== "OPTIONS";
  const init: RequestInit = {
    method,
    headers: copyHeaders(request.headers),
    redirect: "manual",
  };

  if (hasBody) {
    init.body = request.body;
    Object.assign(init, { duplex: "half" });
  }

  try {
    const upstreamResponse = await fetch(upstream, init);
    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: copyHeaders(upstreamResponse.headers),
    });
  } catch {
    return new Response(null, { status: 502 });
  }
}
