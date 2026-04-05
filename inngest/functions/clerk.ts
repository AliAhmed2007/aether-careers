import { inngest, organizationCreatedEvent, userCreatedEvent, userDeletedEvent, userUpdatedEvent } from "../client";
import { NonRetriableError } from "inngest";
import { deleteUser, insertUser, updateUser } from "@/features/users/db/users";
import { insertUserNontificationSettings } from "@/features/users/db/usersNotificationSettings";
import { insertOrganization } from "@/features/organizations/db/organizations";

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

export const clerkUpdateUser = inngest.createFunction(
    { id: "clerk/update-db-user", name: "Clerk - Update Database User", triggers: [{ event: userUpdatedEvent }] },
    async ({ event, step }) => {
        await step.run("update-user", async () => {
            const userData = event.data.data
            const email = userData.email_addresses.find(
                email => email.id === userData.primary_email_address_id
            )

            if (email == null) {
                throw new NonRetriableError("No primary email address found")
            }

            await updateUser(userData.id, {
                name: `${userData.first_name} ${userData.last_name}`,
                imageUrl: userData.image_url,
                email: email.email_address,
                updatedAt: new Date(userData.updated_at),
            })
        })
    }
)

export const clerkDeleteUser = inngest.createFunction(
    { id: "clerk/delete-db-user", name: "Clerk - Delete Database User", triggers: [{ event: userDeletedEvent }] },
    async ({ event, step }) => {
        await step.run("delete-user", async () => {
            const id = event.data.data.id

            if (id == null) {
                throw new NonRetriableError("No id found")
            }
            await deleteUser(id)
        })
    }
)

export const clerkCreateOrganization = inngest.createFunction(
    {
        id: "clerk/create-db-organization",
        name: "Clerk - Create Database Organization",
        triggers: [{ event: organizationCreatedEvent }],
    },
    async ({ event, step }) => {
        // Step 1: Validate payload shape (NOT signature)
        const orgData = event.data?.data;

        if (!orgData) {
            throw new NonRetriableError("Malformed event payload");
        }

        // Step 2: Create organization in DB
        await step.run("Create Organization", async () => {
            await insertOrganization({
                id: orgData.id,
                name: orgData.name,
                imageUrl: orgData.image_url!,
                createdAt: new Date(orgData.created_at),
                updatedAt: new Date(orgData.updated_at),
            });
        });
    }
);

// export const clerkUpdateOrganization = inngest.createFunction(
//     { id: "clerk/update-db-user", name: "Clerk - Update Database User", triggers: [{ event: userUpdatedEvent }] },
//     async ({ event, step }) => {
//         await step.run("update-user", async () => {
//             const userData = event.data.data
//             const email = userData.email_addresses.find(
//                 email => email.id === userData.primary_email_address_id
//             )

//             if (email == null) {
//                 throw new NonRetriableError("No primary email address found")
//             }

//             await updateUser(userData.id, {
//                 name: `${userData.first_name} ${userData.last_name}`,
//                 imageUrl: userData.image_url,
//                 email: email.email_address,
//                 updatedAt: new Date(userData.updated_at),
//             })
//         })
//     }
// )

// export const clerkDeleteOrganization = inngest.createFunction(
//     { id: "clerk/delete-db-user", name: "Clerk - Delete Database User", triggers: [{ event: userDeletedEvent }] },
//     async ({ event, step }) => {
//         await step.run("delete-user", async () => {
//             const id = event.data.data.id

//             if (id == null) {
//                 throw new NonRetriableError("No id found")
//             }
//             await deleteUser(id)
//         })
//     }
// )