import { Outlet, useLocation } from 'react-router';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '../components/ui/sidebar';
import { Separator } from '../components/ui/separator';
import AppSidebar from '../components/shared/AppSidebar';
import { adminNavigationItems } from '@/features/admin/config';

export default function AdminLayout() {
  const location = useLocation();
  const currentNav = adminNavigationItems.find(
    (item) => item.url === location.pathname
  );

  return (
    <SidebarProvider>
      <AppSidebar items={adminNavigationItems} roleLabel="Admin Portal" />

      <SidebarInset className="min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-background px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-5" />
          <h1 className="text-base font-semibold tracking-tight text-slate-900">
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
