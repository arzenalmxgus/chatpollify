import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import { PollProvider } from "./contexts/PollContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ChatProvider>
        <PollProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PollProvider>
      </ChatProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;