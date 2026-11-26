import { Bot, LogOut } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
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
} from '../ui/sidebar';
import { getCurrentUser } from '@/lib/auth';
import { useLogout } from '@/features/auth/hooks/useLogout';

export interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

interface AppSidebarProps {
  items: NavItem[];
  roleLabel?: string;
}

export default function AppSidebar({
  items,
  roleLabel = 'Dashboard',
}: AppSidebarProps) {
  const location = useLocation();
  const logout = useLogout();
  const currentUser = getCurrentUser();

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200 bg-white">
      <SidebarHeader className="flex h-16 justify-center border-b border-slate-200/70 px-3 group-data-[collapsible=icon]:px-0">
        <div className="flex cursor-pointer items-center gap-3 rounded-lg px-1.5 py-1 transition-colors hover:bg-slate-100/80 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm transition-transform hover:scale-105 group-data-[collapsible=icon]:size-8">
            <Bot className="animate-robot-wiggle size-5 group-data-[collapsible=icon]:size-4" />
          </div>

          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-base font-bold leading-tight tracking-tight text-slate-900">
              EduBot
            </span>
            <span className="truncate text-xs font-medium text-muted-foreground">
              {roleLabel}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5 group-data-[collapsible=icon]:items-center">
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<NavLink to={item.url} />}
                      className={`h-10 gap-3 rounded-lg px-3 transition-all group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!p-0 ${
                        isActive
                          ? '!bg-purple-600 !text-white shadow-sm hover:!bg-purple-700'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <item.icon className="size-4.5 shrink-0" />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/70 p-2 group-data-[collapsible=icon]:items-center">
        {currentUser && (
          <div className="mb-1.5 flex items-center gap-2.5 rounded-lg bg-slate-100/80 px-2.5 py-2 group-data-[collapsible=icon]:hidden">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold uppercase text-purple-700">
              {currentUser.email.slice(0, 2)}
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-xs font-semibold text-slate-800">
                {currentUser.email}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {currentUser.role}
              </span>
            </div>
          </div>
        )}

        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logout}
              tooltip="Logout"
              className="h-10 cursor-pointer gap-3 rounded-lg px-3 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!p-0"
            >
              <LogOut className="size-4.5 shrink-0" />
              <span className="font-medium group-data-[collapsible=icon]:hidden">
                Logout
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
