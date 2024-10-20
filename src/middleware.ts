/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

const isPublicRoute = createRouteMatcher([
  "/",
  "/:locale",
  "/:locale/sign-in(.*)",
  "/:locale/sign-up(.*)",
]);

function handlePostHogRewrites(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = url.pathname.startsWith("/ingest/static/")
    ? "eu-assets.i.posthog.com"
    : "eu.i.posthog.com";
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("host", hostname);

  url.protocol = "https";
  url.hostname = hostname;
  url.port = "443";
  url.pathname = url.pathname.replace(/^\/ingest/, "");

  return NextResponse.rewrite(url, {
    headers: requestHeaders,
  });
}

export default clerkMiddleware((auth, req) => {
  if (req.nextUrl.pathname.startsWith("/ingest")) {
    return handlePostHogRewrites(req);
  }
  if (!isPublicRoute(req)) auth().protect();

  return handleI18nRouting(req);
});

export const config = {
  matcher: [
    // Matcher for PostHog rewrites
    "/ingest/:path*",
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
