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
  
/**
 * A dropdown menu that displays a user avatar and a logout link.
 * 
 * This component assumes that the user is logged in and the token is stored in localStorage.
 * If the user is not logged in, the component will not render.
 * 
 * It uses the `useLogout` hook to handle the logout functionality.
 * When the logout button is clicked, the `logout` function is called with the current token.
 * The `logout` function calls the `logoutFn` mutation with the token, which logs the user out and invalidates the "auth" query.
 * @returns A `DropdownMenu` component with a user avatar and a logout link.
 */
  export function UserDropdown() {
    const {mutate: logoutFn }= useLogout();
    const token = localStorage.getItem("token") as string;

    function logout () {
      if (token) {
        logoutFn(token);
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
  