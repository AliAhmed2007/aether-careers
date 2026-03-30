import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { UserNotificationSettingsTable } from "./userNotificationSettings";
import { UserResumeTable } from "./userResume";
import { OrganizationUserSettingsTable } from "./organizationUserSettings";
import { relations } from "drizzle-orm";

export const UserTable = pgTable("users", {
    id: varchar().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    imageUrl: varchar().notNull(),
    createdAt,
    updatedAt
});

export const userRelations = relations(UserTable, ({ one, many }) => ({
    notificationSettings: one(UserNotificationSettingsTable),
    resume: one(UserResumeTable),
    organizationUserSettings: many(OrganizationUserSettingsTable),
}))