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
import SidebarUserButton from "@/features/users/components/SidebarUserButton";
import {
  BrainCircuitIcon,
  ClipboardListIcon,
  LayoutDashboard,
  LogInIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const jobSeekerLinks: SidebarItemType[] = [
  { href: "/", icon: <ClipboardListIcon />, label: "Job Board" },
];

function EmployerLayout({ children }: { children: ReactNode }) {
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

export default EmployerLayout;

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
