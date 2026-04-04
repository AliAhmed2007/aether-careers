import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { clerkCreateUser, clerkDeleteUser, clerkUpdateUser } from "@/inngest/functions/clerk";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [clerkCreateUser, clerkDeleteUser, clerkUpdateUser],
});