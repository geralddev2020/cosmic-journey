import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import APODDashboard from "./features/apod/APODDashboardView";
import { Toaster } from "@/components/ui/sonner";
import "./assets/main.css";
import AppQueryClientProvider from "@/providers/AppQueryClientProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppQueryClientProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<APODDashboard />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AppQueryClientProvider>
  </StrictMode>,
);
