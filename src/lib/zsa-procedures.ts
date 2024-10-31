import { auth } from "@clerk/nextjs/server";
import { createServerActionProcedure } from "zsa";

export function authed() {
  const user = auth();
  if (!user.userId) throw new Error("Not authenticated");
  return user;
}

export const authedAction = createServerActionProcedure().handler(async () =>
  authed(),
);
