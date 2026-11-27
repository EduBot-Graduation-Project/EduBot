import { BookOpen, FileText, LayoutDashboard, Presentation, School } from 'lucide-react';
import type { NavItem } from '@/shared/components/AppSidebar';

export const adminNavigationItems: NavItem[] = [
  { title: 'Overview', url: '/admin/overview', icon: LayoutDashboard },
  { title: 'Classrooms', url: '/admin/classrooms', icon: School },
];

export const operatorNavigationItems: NavItem[] = [
  { title: 'Dashboard', url: '/operator/dashboard', icon: LayoutDashboard },
  { title: 'My Courses', url: '/operator/courses', icon: BookOpen },
  { title: 'Live Sessions', url: '/operator/sessions', icon: Presentation },
];

export const studentNavigationItems: NavItem[] = [
  { title: 'Dashboard', url: '/student/dashboard', icon: LayoutDashboard },
  { title: 'My Subjects', url: '/student/subjects', icon: BookOpen },
  { title: 'Lecture Notes', url: '/student/notes', icon: FileText },
];
