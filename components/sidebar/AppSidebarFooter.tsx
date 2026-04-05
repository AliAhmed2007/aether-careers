import { Show } from "@clerk/nextjs";
import { SidebarFooter, SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import { ReactNode } from "react";

function AppSidebarFooter({ footerBtn }: { footerBtn: ReactNode }) {
  return (
    <Show when="signed-in">
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>{footerBtn}</SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Show>
  );
}

export default AppSidebarFooter;
