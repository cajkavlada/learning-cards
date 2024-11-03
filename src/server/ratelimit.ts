import { Ratelimit, type Duration } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function createRateLimit(count: number, duration: Duration) {
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(count, duration),
    analytics: true,
    prefix: "@upstash/ratelimit",
  });
}

export const rateLimiters = {
  createTopic: createRateLimit(2, "10 s"),
  createQuestion: createRateLimit(3, "10 s"),
};
