"use client";

import * as React from "react";
import {
  Bell,
  Blocks,
  Check,
  Globe,
  Keyboard,
  Link,
  Lock,
  MessageCircle,
  Paintbrush,
  ScrollText,
  Settings,
  Video,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import NotificationSettings from "@/components/NotificationSettings";
import AuditLog from "@/components/AuditLog";
import Integrations from "@/components/Integrations";
import NewAccount from "@/components/NewAccount";

const data = {
  nav: [
    {
      id: 0,
      name: "Notifications",
      icon: Bell,
      component: NotificationSettings,
    },
    { id: 1, name: "Audit log", icon: ScrollText, component: AuditLog },
    { id: 2, name: "Integrations", icon: Blocks, component: Integrations },
    { id: 3, name: "New Account", icon: Paintbrush, component: NewAccount },
    { id: 4, name: "Messages & media", icon: MessageCircle },
    { id: 5, name: "Language & region", icon: Globe },
    { id: 6, name: "Accessibility", icon: Keyboard },
    { id: 7, name: "Mark as read", icon: Check },
    { id: 8, name: "Audio & video", icon: Video },
    { id: 9, name: "Connected accounts", icon: Link },
    { id: 10, name: "Privacy & visibility", icon: Lock },
    { id: 11, name: "Advanced", icon: Settings },
  ],
};

export function SettingsDialog() {
  const [open, setOpen] = React.useState(true);
  const [activeBarId, setActiveBarId] = React.useState(0); // Default to 0 for Notifications

  const ActiveComponent =
    data.nav[activeBarId].component ||
    (() => <div>No component found for {data.nav[activeBarId].name}</div>);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          asChild
                          onClick={() => setActiveBarId(item.id)}
                        >
                          <a
                            href="#"
                            className={
                              item.id === activeBarId
                                ? "font-bold text-primary"
                                : ""
                            }
                          >
                            <item.icon />
                            <span>{item.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        {
                          data.nav.find((navItem) => navItem.id === activeBarId)
                            ?.name
                        }
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              <ActiveComponent />
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
