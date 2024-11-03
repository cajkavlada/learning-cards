import { auth } from "@clerk/nextjs/server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import analyticsServerClient from "~/server/analytics";
import { rateLimiters } from "~/server/ratelimit";

export function authed() {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");
  return user;
}

type RateLimitType = keyof typeof rateLimiters;

export function handleServerError(e: Error) {
  return { name: e.name, message: e.message };
}

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z
      .object({
        eventName: z.string(),
        rateLimitType: z
          .enum(
            Object.keys(rateLimiters) as [RateLimitType, ...RateLimitType[]],
          )
          .optional(),
      })
      .optional();
  },
  handleServerError,
  // defaultValidationErrorsShape: "flattened",
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const { userId } = authed();
  return next({ ctx: { userId } });
});

export const analyticsAuthActionClient = authActionClient.use(
  async ({ next, metadata, ctx: { userId } }) => {
    if (!metadata) throw new Error("Missing metadata");
    const result = await next();
    analyticsServerClient.capture({
      distinctId: userId,
      event: metadata.eventName,
      properties: { result },
    });
    return result;
  },
);

export const rateLimitAnalyticsAuthActionClient = analyticsAuthActionClient.use(
  async ({ next, metadata, ctx: { userId } }) => {
    if (!metadata?.rateLimitType)
      throw new Error("Missing rate limit metadata");

    const { success } =
      await rateLimiters[metadata.rateLimitType].limit(userId);

    if (!success) {
      throw new Error("Rate limit reached. Try again later.");
    }
    return next();
  },
);
