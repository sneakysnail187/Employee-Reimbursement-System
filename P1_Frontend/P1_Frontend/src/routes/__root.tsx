import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  /**
   * The root route component that wraps the entire app with the React Query
   * provider and the Toaster component.
   *
   * The QueryProvider is used to share the same QueryClient instance across
   * all components in the app.
   *
   * The Toaster component is used to display toast messages across the app.
   *
   * The Outlet component is used to render the child routes of this route.
   */
  component: () => (
    <QueryProvider>
      <div>
        <Outlet />
        <Toaster />
      </div>
    </QueryProvider>
  ),
});
