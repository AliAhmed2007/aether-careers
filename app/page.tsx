import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebarClient from "./_AppSidebarClient";
import Link from "next/link";
import { LogInIcon } from "lucide-react";
import { Show } from "@clerk/nextjs";
import SidebarUserButton from "@/features/users/components/SidebarUserButton";
export default function Home() {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">Aether Jobs</span>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <Show when="signed-out">
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Link href="/sign-in">
                        <LogInIcon />
                        <span>Log In</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Show>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <Show when="signed-in">
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarUserButton />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Show>
        </Sidebar>
        <main>asdfasdfadf</main>
      </AppSidebarClient>
    </SidebarProvider>
  );
}
