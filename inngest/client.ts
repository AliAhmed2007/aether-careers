import { DeletedObjectJSON, OrganizationJSON, UserJSON } from "@clerk/nextjs/server";
import { Inngest, eventType, staticSchema } from "inngest";

type ClerkWebhookPayload<T> = {
  data: T;
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

export const organizationCreatedEvent = eventType("clerk/organization.created", {
  schema: staticSchema<ClerkWebhookPayload<OrganizationJSON>>(),
});

export const organizationUpdatedEvent = eventType("clerk/organization.updated", {
  schema: staticSchema<ClerkWebhookPayload<OrganizationJSON>>(),
});

export const organizationDeletedEvent = eventType("clerk/organization.deleted", {
  schema: staticSchema<ClerkWebhookPayload<DeletedObjectJSON>>(),
});


export const inngest = new Inngest({
  id: "aether-careers",
  baseUrl: "http://127.0.0.1:8288/v1",
  isDev: process.env.NODE_ENV === "development",
});