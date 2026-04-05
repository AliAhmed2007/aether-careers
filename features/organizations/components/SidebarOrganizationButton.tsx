import { SignOutButton } from "@/services/clerk/components/AuthButtons";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { LogOutIcon } from "lucide-react";
import {
  getCurrentOrganization,
  getCurrentUser,
} from "@/services/clerk/lib/getCurrentAuth";
import { SidebarOrganizationButtonClient } from "./_SidebarOrganizationButtonClient";

async function SidebarOrganizationButton() {
  const [{ user }, { organization }] = await Promise.all([
    getCurrentUser({ allData: true }),
    getCurrentOrganization({ allData: true }),
  ]);

  if (user == null || organization == null) {
    return (
      <SignOutButton>
        <SidebarMenuButton>
          <LogOutIcon />
          <span>Log Out</span>
        </SidebarMenuButton>
      </SignOutButton>
    );
  }

  return <SidebarOrganizationButtonClient user={user} organization={organization} />;
}

export default SidebarOrganizationButton;
