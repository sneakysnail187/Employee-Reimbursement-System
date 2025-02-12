import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";

const sidebarState = atomWithStorage("sidebarState", true);

/**
 * useSidebar hook
 *
 * Provides an interface for managing the sidebar's open/closed state.
 *
 * @returns An object with the following properties:
 *   isOpen: boolean - Whether the sidebar is currently open.
 *   isMounted: boolean - Whether the sidebar has been mounted.
 *   open: () => void - Opens the sidebar.
 *   close: () => void - Closes the sidebar.
 *   toggle: () => void - Toggles the sidebar's open/closed state.
 */
export function useSidebar() {
  const [isOpen, setIsOpen] = useAtom(sidebarState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    isMounted,
    open,
    close,
    toggle,
  };
}
