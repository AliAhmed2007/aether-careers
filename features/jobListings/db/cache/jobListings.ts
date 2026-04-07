import { getOrganizationIdTag } from "@/features/organizations/db/cache/organizations"
import { getGlobalTag, getIdTag, getOrganizationTag } from "@/lib/dataCache"
import { revalidateTag } from "next/cache"

export function getJobListingGlobalTag() {
    return getGlobalTag("jobListings")
}

export function getJobListingOrganizationTag(orgId: string) {
    return getOrganizationTag("jobListings", orgId)
}

export function getJobListingIdTag(id: string) {
    return getIdTag("jobListings", id)
}

export function revalidateJobListingCache(id: string) {
    revalidateTag(getJobListingGlobalTag(), "default")
    revalidateTag(getJobListingOrganizationTag(id), "default")
    revalidateTag(getJobListingIdTag(id), "default")
}
