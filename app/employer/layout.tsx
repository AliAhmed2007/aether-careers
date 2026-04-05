import AppSidebar from "@/components/sidebar/AppSidebar";
import SidebarNavMenuGroup, {
  type SidebarItemType,
} from "@/components/sidebar/SidebarNavMenuGroup";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import SidebarOrganizationButton from "@/features/organizations/components/SidebarOrganizationButton";
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth";
import { ClipboardListIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

const jobSeekerLinks: SidebarItemType[] = [
  { href: "/", icon: <ClipboardListIcon />, label: "Job Board" },
];

export default function EmployerLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <EmployerLayoutSuspense>{children}</EmployerLayoutSuspense>
    </Suspense>
  );
}

async function EmployerLayoutSuspense({ children }: { children: ReactNode }) {
  const { orgId } = await getCurrentOrganization();
  
  if (orgId == null) redirect("/organizations/select");
  return (
    <AppSidebar
      content={
        <>
          <CurrentJobListings />
          <SidebarNavMenuGroup items={jobSeekerLinks} className="mt-auto" />
        </>
      }
      footerBtn={<SidebarOrganizationButton />}
    >
      {children}
    </AppSidebar>
  );
}

function CurrentJobListings() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Job Listings</SidebarGroupLabel>
      <SidebarGroupAction title="Add Job Listing" asChild>
        <Link href="/employer/job-listings/new">
          <PlusIcon /> <span className="sr-only">Add Job Listing</span>
        </Link>
      </SidebarGroupAction>
    </SidebarGroup>
  );
}
