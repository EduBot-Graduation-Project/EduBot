import { motion } from "framer-motion";
import { ArrowLeft, Home, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex max-w-md flex-col items-center"
      >
        <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-purple-200 text-purple-700">
          <GraduationCap className="size-7" />
        </div>

        <h1 className="text-7xl font-extrabold text-purple-600">404</h1>

        <h2 className="mt-3 text-xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <div className="mt-6 flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </Button>

          <Button
            onClick={() => navigate("/")}
            className="gap-2 bg-purple-500 text-white hover:bg-purple-600"
          >
            <Home className="size-4" />
            Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
}