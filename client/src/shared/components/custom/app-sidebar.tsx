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
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const getMenuItemsByUserType = (userType: string) => {
  const adminItems = [
    { 
      title: "Dashboard", 
      icon: DashboardIcon, 
      action: "/dashboard" 
    },
    {
      title: "Alunos",
      icon: GroupIcon,
      action: "/students",
      items: [
        { title: "Todos os Alunos", action: "/students" },
        { title: "Alterações Cadastrais", action: "/students/changes" },
      ],
    },
    { 
      title: "Formulários", 
      icon: FormIcon, 
      action: "/forms" 
    },
  ];

  const studentItems = [
    {
      title: "Alunos",
      icon: GroupIcon,
      action: "/students/profile",
      items: [
        { title: "Alterações Cadastrais", action: "/students/changes" },
      ],
    },
    { 
      title: "Formulários", 
      icon: FormIcon, 
      action: "/forms" 
    },
  ];

  return userType === "Administrator" ? adminItems : studentItems;
};

const getFooterItems = (handleLogout: () => void) => [
  { title: "Notificações", icon: BellIcon, action: "/notifications" },
  { title: "Meu perfil", icon: UserIcon, action: "/profile" },
  { title: "Sair do sistema", icon: LogoutIcon, action: handleLogout },
];

export function AppSidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";

  const userType = session?.user?.dtype || "Student";
  const menuItems = getMenuItemsByUserType(userType);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const footerItems = getFooterItems(handleLogout);

  const handleAction = (action: string | (() => void)) => {
    if (typeof action === "function") {
      action();
    } else {
      handleNavigation(action);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-6 flex">
        {isCollapsed ? (
          <div className="flex">
            <AcademyIcon height={36} />
          </div>
        ) : (
          <div className="flex px-16">
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
                                onClick={() => handleAction(subItem.action)}
                                className="text-action-950 hover:bg-slate-100 cursor-pointer"
                              >
                                <span className="font-sans">
                                  {subItem.title}
                                </span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      onClick={() => handleAction(item.action)}
                      tooltip={item.title}
                      className="text-action-950 hover:bg-slate-100 cursor-pointer"
                    >
                      <item.icon className="fill-action-300" />
                      <span className="font-sans">{item.title}</span>
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
                onClick={() => handleAction(item.action)}
                tooltip={item.title}
                className="text-action-950 hover:bg-slate-100 cursor-pointer"
              >
                <item.icon className="fill-action-300" />
                <span className="font-sans">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}