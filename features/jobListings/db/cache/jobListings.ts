import { getGlobalTag, getIdTag, getOrganizationTag } from "@/lib/dataCache"
import { revalidateTag, updateTag } from "next/cache"

export function getJobListingGlobalTag() {
    return getGlobalTag("jobListings")
}

export function getJobListingOrganizationTag(orgId: string) {
    return getOrganizationTag("jobListings", orgId)
}

export function getJobListingIdTag(id: string) {
    return getIdTag("jobListings", id)
}

// Use in Route Handlers — stale-while-revalidate semantics
export function revalidateJobListingCache({
    id,
    organizationId,
}: {
    id: string
    organizationId: string
}) {
    revalidateTag(getJobListingGlobalTag(), "default")
    revalidateTag(getJobListingOrganizationTag(organizationId), "default")
    revalidateTag(getJobListingIdTag(id), "default")
}

// Use in Server Actions — immediately expires cache so the user sees their own changes right away
export function updateJobListingCache({
    id,
    organizationId,
}: {
    id: string
    organizationId: string
}) {
    updateTag(getJobListingGlobalTag())
    updateTag(getJobListingOrganizationTag(organizationId))
    updateTag(getJobListingIdTag(id))
}
