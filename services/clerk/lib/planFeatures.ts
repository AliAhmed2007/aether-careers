import { auth } from "@clerk/nextjs/server";

export type OrgFeature =
    | "add_1_feature_job_listing"
    | "add_unlimited_featured_job_listings"
    | "create_job_listing"
    | "manage_applicant_workflow"
    | "post_1_job_listing"
    | "post_3_job_listings"
    | "post_10_job_listing";
export async function hasPlanFeature(feature: OrgFeature) {
    const { has } = await auth()
    return has({ feature })
}