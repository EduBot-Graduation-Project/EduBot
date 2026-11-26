import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { Separator } from '../components/ui/separator';
import AppSidebar from '../components/shared/AppSidebar';
import { studentNavigationItems } from '@/features/student/config';

export default function StudentLayout() {
  return (
    <SidebarProvider>
      <AppSidebar items={studentNavigationItems} roleLabel="Student Portal" />
      <SidebarInset className="min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-col truncate">
            <h1 className="text-sm font-semibold truncate">EduBot Student</h1>
            <p className="text-xs text-muted-foreground truncate">Learning Portal</p>
          </div>
        </header>
        <main className="flex-1 bg-muted/30 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}