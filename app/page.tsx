import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebarClient from "./_AppSidebarClient";

export default function Home() {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">Aether Jobs</span>
          </SidebarHeader>

          <SidebarContent></SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Click here</SidebarMenuButton>
              </SidebarMenuItem>
              
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main>asdfasdfadf</main>
      </AppSidebarClient>
    </SidebarProvider>
  );
}
