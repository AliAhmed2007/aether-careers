import { DeletedObjectJSON, UserJSON } from "@clerk/nextjs/server";
import { Inngest, eventType, staticSchema } from "inngest";

type ClerkWebhookPayload<T> = {
  data: T;
  raw: string;
  headers: Record<string, string>;
};

export const userCreatedEvent = eventType("clerk/user.created", {
  schema: staticSchema<ClerkWebhookPayload<UserJSON>>(),
});

export const userUpdatedEvent = eventType("clerk/user.updated", {
  schema: staticSchema<ClerkWebhookPayload<UserJSON>>(),
});

export const userDeletedEvent = eventType("clerk/user.deleted", {
  schema: staticSchema<ClerkWebhookPayload<DeletedObjectJSON>>(),
});

export const inngest = new Inngest({
  id: "aether-careers",
  baseUrl: "http://127.0.0.1:8288/v1",
  
  // V4 defaults to Cloud mode and expects a signing key. 
  // For local dev, you explicitly set isDev to true (or use INNGEST_DEV=1 in your .env)
  isDev: process.env.NODE_ENV === "development",
});