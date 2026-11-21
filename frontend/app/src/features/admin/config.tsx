

import { LayoutDashboard, BookOpen, NotebookText, CloudUpload , User2Icon } from "lucide-react";

export const adminNavigationItems = [
  { title: "Overview", url: "/admin/overview", icon: LayoutDashboard },
  { title: "Courses", url: "/admin/courses", icon: BookOpen },
  { title: "Lectures", url: "/admin/lectures", icon: NotebookText },
  { title: "Students", url: "/admin/students", icon: User2Icon },
  { title: "Upload Materials", url: "/admin/materials/upload", icon: CloudUpload },
];

