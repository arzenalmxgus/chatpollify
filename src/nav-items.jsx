import { HomeIcon, LogInIcon } from "lucide-react";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export const navItems = [
  {
    title: "Login",
    to: "/",
    icon: <LogInIcon className="h-4 w-4" />,
    page: <Login />,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Dashboard />,
  },
];