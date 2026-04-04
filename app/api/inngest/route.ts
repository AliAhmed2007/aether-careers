import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { clerkCreateUser } from "@/inngest/functions/clerk";

export const runtime = "nodejs";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [clerkCreateUser],
});