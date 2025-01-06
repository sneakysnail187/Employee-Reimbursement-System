import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";

const sidebarState = atomWithStorage("sidebarState", true);

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
