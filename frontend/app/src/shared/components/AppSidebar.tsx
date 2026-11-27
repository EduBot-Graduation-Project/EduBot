import { useLogout } from '@/features/auth/hooks/useLogout'
import { BrandLogo } from '@/shared/components/BrandLogo'
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
} from '@/shared/components/ui/sidebar'
import { getCurrentUser } from '@/shared/lib/auth'
import { LogOut, type LucideIcon } from 'lucide-react'
import { NavLink, useLocation } from 'react-router'

export interface NavItem {
  title: string
  url: string
  icon: LucideIcon
}

interface AppSidebarProps {
  items: NavItem[]
  roleLabel?: string
}

export default function AppSidebar({ items, roleLabel = 'Dashboard' }: AppSidebarProps) {
  const location = useLocation()
  const logout = useLogout()
  const currentUser = getCurrentUser()

  return (
    <Sidebar collapsible='icon' className='border-r border-border bg-background'>
      <SidebarHeader className='flex h-16 justify-center border-b border-border px-3 group-data-[collapsible=icon]:px-0'>
        <div className='flex cursor-pointer items-center gap-3 rounded-lg px-1.5 py-1 transition-colors hover:bg-muted group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0'>
          <BrandLogo
            className='size-9 shadow-sm transition-transform hover:scale-105 group-data-[collapsible=icon]:size-8'
            iconClassName='size-5 group-data-[collapsible=icon]:size-4'
          />

          <div className='flex min-w-0 flex-col group-data-[collapsible=icon]:hidden'>
            <span className='truncate text-base font-bold leading-tight tracking-tight text-foreground'>
              EduBot
            </span>
            <span className='truncate text-xs font-medium text-muted-foreground'>{roleLabel}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className='py-2'>
        <SidebarGroup>
          <SidebarGroupLabel className='px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground'>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-1.5 group-data-[collapsible=icon]:items-center'>
              {items.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<NavLink to={item.url} />}
                      className={`h-10 gap-3 rounded-lg px-3 transition-all group-data-[collapsible=icon]:size-9! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0! ${
                        isActive
                          ? 'bg-sidebar-primary! text-sidebar-primary-foreground! shadow-sm'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }`}
                    >
                      <item.icon className='size-4.5 shrink-0' />
                      <span className='font-medium group-data-[collapsible=icon]:hidden'>
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='border-t border-border p-2 group-data-[collapsible=icon]:items-center'>
        {currentUser && (
          <div className='mb-1.5 flex items-center gap-2.5 rounded-lg bg-muted px-2.5 py-2 group-data-[collapsible=icon]:hidden'>
            <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold uppercase text-primary'>
              {currentUser.email.slice(0, 2)}
            </div>
            <div className='flex min-w-0 flex-col'>
              <span className='truncate text-xs font-semibold text-foreground'>
                {currentUser.email}
              </span>
              <span className='text-[11px] text-muted-foreground'>{currentUser.role}</span>
            </div>
          </div>
        )}

        <SidebarMenu className='group-data-[collapsible=icon]:items-center'>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logout}
              tooltip='Logout'
              className='h-10 cursor-pointer gap-3 rounded-lg px-3 text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive group-data-[collapsible=icon]:size-9! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!'
            >
              <LogOut className='size-4.5 shrink-0' />
              <span className='font-medium group-data-[collapsible=icon]:hidden'>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
