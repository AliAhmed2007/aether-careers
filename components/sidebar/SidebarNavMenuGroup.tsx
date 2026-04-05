"use client";
import { Show } from "@clerk/nextjs";
import { ReactNode } from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarItemType {
  href: string;
  icon: ReactNode;
  label: string;
  authStatus?: "signedIn" | "signedOut";
}
export default function SidebarNavMenuGroup({
  items,
  className,
}: {
  items: SidebarItemType[];
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup className={className}>
      <SidebarMenu>
        {items.map((item) => {
          const jsx = (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
          if (item.authStatus === "signedIn") {
            return <Show key={item.href} when="signed-in">{jsx}</Show>;
          }
          if (item.authStatus === "signedOut") {
            return <Show key={item.href} when="signed-out">{jsx}</Show>;
          }
          return jsx;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
