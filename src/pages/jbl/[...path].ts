import type { APIRoute } from "astro";
import { proxyPostHogRequest } from "@/lib/analytics/proxy";

export const prerender = false;

export const ALL: APIRoute = proxyPostHogRequest;
