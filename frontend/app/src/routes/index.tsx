import { createBrowserRouter, Navigate } from "react-router";

import AdminLayout from "../layouts/AdminLayout";
import Overview from "../features/admin/pages/Overview";
import Courses from "../features/admin/pages/Courses";
import Lectures from "../features/admin/pages/Lectures";
import UploadMaterials from "../features/admin/pages/UploadMaterials";
import NotFoundPage from "@/pages/NotFoundPage";
import Students from "@/features/admin/pages/Students";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin/overview" replace />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="overview" replace />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "lectures",
        element: <Lectures />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "materials/upload",
        element: <UploadMaterials />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);