import { env } from "@/data/env/server";
import { inngest, userCreatedEvent } from "../client";
import { Webhook } from 'svix';
import { NonRetriableError } from "inngest";
import { insertUser } from "@/features/users/db/users";
import { insertUserNontificationSettings } from "@/features/users/db/usersNotificationSettings";
function verifyWebhook({ raw, headers }: { raw: string, headers: Record<string, string> }) {
    return new Webhook(env.CLERK_WEBHOOK_SECRET).verify(raw, headers)
}

export const clerkCreateUser = inngest.createFunction(
    {
        id: "clerk/create-db-user",
        name: "Clerk - Create Database User",
        triggers: [{ event: userCreatedEvent }]
    },
    async ({ event, step }) => {
        // First: verify the webhook is valid
        await step.run("Verify Webhook", async () => {
            try {
                verifyWebhook(event.data)
            } catch {
                throw new NonRetriableError("Invalid Webhook")
            }
        })
        // Second: Create a user in both clerk and drizzle
        const userId = await step.run("Create User", async () => {
            const userData = event.data.data
            const email = userData.email_addresses.find((email) => email.id === userData.primary_email_address_id)
            if (email == null) {
                throw new NonRetriableError("No Primary Email Address Found.");
            }
            await insertUser({
                id: userData.id,
                name: `${userData.first_name} ${userData.last_name}`,
                imageUrl: userData.image_url,
                email: email.email_address,
                createdAt: new Date(userData.created_at),
                updatedAt: new Date(userData.updated_at)

            })
            return userData.id
        })
        // Third Setting up a default user notification settings
        await step.run("Create User Notification Settings", async () => {
            await insertUserNontificationSettings({ userId })
        })
        return userId
    }
)

