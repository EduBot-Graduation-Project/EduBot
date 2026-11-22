import { GraduationCap, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

export interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

interface AppSidebarProps {
  items: NavItem[];
  roleLabel?: string;
  onLogout?: () => void;
}

export default function AppSidebar({
  items,
  roleLabel = "Dashboard",
  onLogout,
}: AppSidebarProps) {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
        <motion.div
          initial="rest"
          whileHover="hover"
          className="flex cursor-pointer items-center gap-3 rounded-lg p-1 transition-colors hover:bg-slate-100/80 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.08 },
            }}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-400 text-black group-data-[collapsible=icon]:size-8"
          >
            <motion.div
              variants={{
                rest: { rotate: 0 },
                hover: {
                  rotate: [0, -14, 12, -6, 0],
                  transition: { duration: 0.5, ease: "easeInOut" },
                },
              }}
            >
              <GraduationCap className="size-5" />
            </motion.div>
          </motion.div>

          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-lg leading-tight">EduBot</span>
            <span className="text-xs text-muted-foreground">{roleLabel}</span>
          </div>
        </motion.div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-5">
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<NavLink to={item.url} />}
                      className={`h-11 rounded-lg gap-3 ${
                        isActive
                          ? "!bg-purple-500 !text-white hover:!bg-purple-600"
                          : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                      }`}
                    >
                      <item.icon className="size-5 shrink-0" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/60 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              tooltip="Logout"
              className="h-11 cursor-pointer gap-3 rounded-lg text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="size-5 shrink-0" />
              <span className="font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="px-2 pt-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          EduBot Management System
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}