import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import AppSidebarClient from "./_AppSidebarClient";
import { ReactNode, Suspense } from "react";
import AppSidebarFooter from "./AppSidebarFooter";
export default function AppSidebar({
  children,
  content,
  footerBtn,
}: {
  children: ReactNode;
  content: ReactNode;
  footerBtn: ReactNode;
}) {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">Aether Jobs</span>
          </SidebarHeader>

          <SidebarContent>{content}</SidebarContent>
          <Suspense fallback={<span>Loading...</span>}>
            <AppSidebarFooter footerBtn={footerBtn} />
          </Suspense>
        </Sidebar>
        <main className="w-full">{children}</main>
      </AppSidebarClient>
    </SidebarProvider>
  );
}
