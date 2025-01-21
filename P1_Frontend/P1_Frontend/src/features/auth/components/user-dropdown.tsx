import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { useLogout } from "../hooks/use-logout";
  import { UserAvatar } from "./user-avatar";
  
  export function UserDropdown() {
    const logoutFn = useLogout();
    const token = localStorage.getItem("token") as string | null;

    const logout = async () => {
      if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        logoutFn.mutate(token);
      }
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  