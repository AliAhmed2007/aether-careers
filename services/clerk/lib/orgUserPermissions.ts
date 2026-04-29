import { auth } from "@clerk/nextjs/server";

export type UserPermission =
    | "org:job_listing:applicant_change_rating"
    | "org:job_listing:applicant_change_stage"
    | "org:job_listing:job_listing_change_status"
    | "org:job_listing:job_listing_create"
    | "org:job_listing:job_listing_delete"
    | "org:job_listing:job_listing_update"
    | "org:job_listing_applicant:applicant_change_rating"
    | "org:job_listing_applicant:applicant_change_stage";

export async function hasOrgUserPermission(permission: UserPermission) {
    const { has } = await auth()
    return has({ permission })
}