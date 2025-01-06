import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <QueryProvider>
      <div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <h1 className="text-2xl font-bold mb-4">Employee Reimbursement System</h1>
        </div>
        <Outlet />
        <Toaster />
      </div>
    </QueryProvider>
  ),
});
