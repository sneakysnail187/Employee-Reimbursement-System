import { Navbar } from "@/components/shared/navbar";
import {
  Sidebar,
  SidebarChildren,
  SidebarTrigger,
  SidebarWrapper,
} from "@/components/shared/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Navbar />

      <SidebarWrapper>
        <Sidebar>Sidebar</Sidebar>

        <SidebarChildren>
          <SidebarTrigger />
          <main>
            <Outlet />
          </main>
        </SidebarChildren>
      </SidebarWrapper>
    </div>
  );
}
