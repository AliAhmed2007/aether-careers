import AppSidebar from "@/components/sidebar/AppSidebar";
import SidebarNavMenuGroup, {
  type SidebarItemType,
} from "@/components/sidebar/SidebarNavMenuGroup";
import SidebarUserButton from "@/features/users/components/SidebarUserButton";
import { BrainCircuitIcon, ClipboardListIcon, LayoutDashboard, LogInIcon } from "lucide-react";
import { ReactNode } from "react";

const jobSeekerLinks: SidebarItemType[] = [
  { href: "/", icon: <ClipboardListIcon />, label: "Job Board" },
  {
    href: "/ai-search",
    icon: <BrainCircuitIcon />,
    label: "AI Search",
  },
  {
    href: "/employer",
    icon: <LayoutDashboard />,
    label: "Employer Dashboard",
    authStatus: "signedIn",
  },
  {
    href: "/sign-in",
    icon: <LogInIcon />,
    label: "Sign In",
    authStatus: "signedOut",
  },
];

function JobSeekerLayout({ children }: { children: ReactNode }) {
  return (
    <AppSidebar
      content={
        <SidebarNavMenuGroup items={jobSeekerLinks} className="mt-auto" />
      }
      footerBtn={<SidebarUserButton />}
    >
      {children}
    </AppSidebar>
  );
}

export default JobSeekerLayout;
