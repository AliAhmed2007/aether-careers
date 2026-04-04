import { inngest, userCreatedEvent } from "../client";
import { NonRetriableError } from "inngest";
import { insertUser } from "@/features/users/db/users";
import { insertUserNontificationSettings } from "@/features/users/db/usersNotificationSettings";

export const clerkCreateUser = inngest.createFunction(
  {
    id: "clerk/create-db-user",
    name: "Clerk - Create Database User",
    triggers: [{ event: userCreatedEvent }],
  },
  async ({ event, step }) => {
    // Step 1: Validate payload shape (NOT signature)
    const userData = event.data?.data;

    if (!userData) {
      throw new NonRetriableError("Malformed event payload");
    }

    // Step 2: Create user in DB
    const userId = await step.run("Create User", async () => {
      const email = userData.email_addresses?.find(
        (e: any) => e.id === userData.primary_email_address_id
      );

      if (!email) {
        throw new NonRetriableError("No Primary Email Address Found.");
      }

      await insertUser({
        id: userData.id,
        name: `${userData.first_name ?? ""} ${userData.last_name ?? ""}`.trim(),
        imageUrl: userData.image_url,
        email: email.email_address,
        createdAt: new Date(userData.created_at),
        updatedAt: new Date(userData.updated_at),
      });

      return userData.id;
    });

    // Step 3: Create default notification settings
    await step.run("Create User Notification Settings", async () => {
      await insertUserNontificationSettings({ userId });
    });
  }
);