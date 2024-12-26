import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const sidebarState = atomWithStorage("sidebarState", true);

export function useSidebar() {
  const [isOpen, setIsOpen] = useAtom(sidebarState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
