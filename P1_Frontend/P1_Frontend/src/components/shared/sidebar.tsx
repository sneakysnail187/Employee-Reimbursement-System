import React from "react";
import { Link, LucideIcon, SidebarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { Button } from "../ui/button";

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const {isMounted} = useSidebar();

  if (!isMounted) return null;
  return <div className="flex">{children}</div>;
}

export function SidebarTrigger() {
  const { toggle } = useSidebar();

  return (<div>
  <SidebarIcon
      role="button"
      className="size-4 absolute m-5 z-50 transition-all ease-in-out duration-300 hover:scale-105 text-white"
      onClick={toggle}
    />
  </div>
  );
}

export function SidebarChildren({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div
      className={cn(
        "transition-all ease-in-out duration-300 w-full",
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
        "bg-slate-900 min-h-[calc(100vh-1px)] text-white fixed transition-all ease-in-out duration-300 overflow-y-auto overflow-x-hidden",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {children}
    </div>
  );
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-10">{children}</div>;
}

export function SidebarItem({
  href,
  icon: Icon,
}: {
  href: string;
  icon: LucideIcon;
}) {
  const { isOpen } = useSidebar();

  return (
    <Button variant={"ghost"} className="flex justify-start">
      <Icon />
      <Link
        to={href}
        className={cn(isOpen ? "opacity-100" : "opacity-0 pointer-events-none")}
      >

      </Link>
    </Button>
  );
}