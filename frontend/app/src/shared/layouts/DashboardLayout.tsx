import { Outlet, useLocation } from 'react-router';
import { Separator } from '@/shared/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import AppSidebar, { type NavItem } from '@/shared/components/AppSidebar';

interface DashboardLayoutProps {
  items: NavItem[];
  roleLabel: string;
}

export default function DashboardLayout({
  items,
  roleLabel,
}: DashboardLayoutProps) {
  const location = useLocation();
  const currentNav = items.find((item) => location.pathname.startsWith(item.url));

  return (
    <SidebarProvider>
      <AppSidebar items={items} roleLabel={roleLabel} />

      <SidebarInset className="min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-background px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-5" />
          <h1 className="text-base font-semibold tracking-tight text-foreground">
            {currentNav?.title ?? 'Dashboard'}
          </h1>
        </header>

        <main className="flex-1 bg-muted/30 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
