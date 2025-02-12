import React from "react";
import { LucideIcon, SidebarIcon} from "lucide-react";
import { Label } from "../ui/label"; 
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { Button } from "../ui/button";
import { Link as RouterLink, useRouter } from "@tanstack/react-router"

/**
 * The wrapper element for the Sidebar component. It takes care of only rendering
 * the sidebar when it is mounted. This is necessary because the sidebar is
 * rendered server-side, and we don't want to render it until the client-side
 * state is ready.
 */

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const {isMounted} = useSidebar();

  if (!isMounted) return null;
  return <div className="flex">{children}</div>;
}

/**
 * A trigger that toggles the sidebar open or closed. This trigger is the
 * little icon in the top left corner of the screen that you can click
 * to open or close the sidebar. It is positioned absolutely so that
 * it is always in the same place on the screen.
 * @return {ReactElement} The trigger element.
 */
export function SidebarTrigger() {
  const { toggle } = useSidebar();

  return (
    <div>
      <SidebarIcon
        role="button"
        className="size-4 absolute m-6  z-50 transition-all ease-in-out duration-300 hover:scale-105 text-white"
        onClick={toggle}
      />
    </div>
  );
}

/**
 * The children of the Sidebar component. This component is
 * responsible for animating the children of the sidebar when
 * the sidebar is opened or closed.
 * @param {{ children: React.ReactNode }} props The props for the component.
 * @return {ReactElement} The children of the sidebar component.
 */
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

/**
 * The root element of the sidebar. This component is responsible for
 * rendering the sidebar's background, positioning it, and animating its
 * width when it is opened or closed.
 *
 * @param {{ children: React.ReactNode }} props The children of the sidebar.
 * @return {ReactElement} The sidebar element.
 */
export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div
      className={cn(
        "bg-slate-900 min-h-[calc(100vh-1px)] text-white fixed transition-all ease-in-out duration-300 overflow-y-auto overflow-x-hidden flex flex-col",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {children}
    </div>
  );
}

/**
 * The content area of the sidebar. This component takes care of
 * rendering the children of the sidebar and spacing them out
 * vertically.
 *
 * @param {{ children: React.ReactNode }} props The children of the
 * sidebar.
 * @return {ReactElement} The content element.
 */
export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-10 my-10">{children}</div>;
}

/**
 * A component that groups sidebar items together. This component is
 * responsible for rendering a flex column container for its children,
 * adding appropriate padding.
 * 
 * @param {{ children: React.ReactNode }} props The children to be
 * rendered within the group.
 * @return {ReactElement} The container element for the grouped items.
 */

export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col px-2 ">{children}</div>;
}

/**
 * A label component for the sidebar. This component is responsible for
 * rendering a label that is conditionally visible based on the open state
 * of the sidebar.
 *
 * @param {{ children: React.ReactNode }} props The children of the label.
 * @return {ReactElement} The label element.
 */

export function SidebarLabel({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  return (
    <Label
      className={cn(
        "text-muted-foreground h-9 flex items-center px-4 text-white",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {children}
    </Label>
  );
}

/**
 * A component that represents an individual item in the sidebar.
 * Renders an icon, a name, and navigates to a specified href when clicked.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.name - The name of the sidebar item.
 * @param {string} props.href - The href to navigate to when the item is clicked.
 * @param {LucideIcon} props.icon - The icon component to display for the item.
 * @return {ReactElement} The sidebar item element.
 */

export function SidebarItem({
  name,
  href,
  icon: Icon,
}: {
  name: string;
  href: string;
  icon: LucideIcon;
}) {
  const { isOpen } = useSidebar();
  const router = useRouter();

  return (
    <Button variant={"ghost"} onClick = {() => {router.navigate({to: href})}} className="flex items-center justify-start ">
      <Icon className = "mr-2 h-4 w-4" />
      <RouterLink
        to={href}
        className={cn(isOpen ? "opacity-100" : "opacity-0 pointer-events-none")}
      >

      </RouterLink>
    </Button>
  );
}