import React from "react";
import { SidebarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex">{children}</div>;
}

export function SidebarTrigger() {
  const { toggle } = useSidebar();

  return (
    <SidebarIcon
      role="button"
      className="size-4 absolute m-5 z-50 transition-all ease-in-out duration-300 hover:scale-105"
      onClick={toggle}
    />
  );
}

export function SidebarChildren({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div
      className={cn(
        "transition-all ease-in-out duration-300",
        isOpen ? "ml-64" : "ml-16"
      )}
    >
      {children}
    </div>
  );
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div
      className={cn(
        "bg-slate-900 min-h-[calc(100vh-65px)] text-white fixed transition-all ease-in-out duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {children}
    </div>
  );
}
