"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { AcademyIcon } from "./academy-icon";
import { AcademyLogo } from "./academy-logo";
import {
  BellIcon,
  DashboardIcon,
  FormIcon,
  GroupIcon,
  LogoutIcon,
  UserIcon,
} from "./icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: DashboardIcon, url: "/dashboard" },
  {
    title: "Alunos",
    icon: GroupIcon,
    url: "/students",
    items: [
      { title: "Todos os Alunos", url: "/" },
      { title: "Alterações Cadastrais", url: "/" },
    ],
  },
  { title: "Formulários", icon: FormIcon, url: "/" },
];

const footerItems = [
  { title: "Notificações", icon: BellIcon, url: "/" },
  { title: "Meu perfil", icon: UserIcon, url: "/" },
  { title: "Sair do sistema", icon: LogoutIcon, url: "/" },
];

export function SideMenu() {
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarHeader className="py-6 flex items-center justify-center">
        {isCollapsed ? (
          <div className="flex justify-center items-center">
            <AcademyIcon height={36} />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <AcademyLogo height={61} />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className="text-action-950 hover:bg-slate-100"
                        >
                          <item.icon className="fill-action-300" />
                          <span className="font-sans">{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className="text-action-950 hover:bg-slate-100"
                              >
                                <a href={subItem.url}>
                                  <span className="font-sans">
                                    {subItem.title}
                                  </span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className="text-action-950 hover:bg-slate-100"
                    >
                      <a href={item.url}>
                        <item.icon className="fill-action-300" />
                        <span className="font-sans">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="text-action-950 hover:bg-slate-100"
              >
                <a href={item.url}>
                  <item.icon className="fill-action-300" />
                  <span className="font-sans">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
