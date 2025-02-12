import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "../hooks/use-auth";

/**
 * Displays the user's avatar, which is a circle with the first letter of
 * their first name in the center.
 *
 * The avatar is only displayed if the user is logged in.
 *
 * @returns {JSX.Element} The user's avatar.
 */
export function UserAvatar() {
  const { data: auth } = useAuth();

  if (!auth) return null;

  return (
    <Avatar>
      <AvatarFallback>
        {//auth.email.charAt(0).toUpperCase() +
          auth.firstName.charAt(0).toUpperCase()
        }
      </AvatarFallback>
    </Avatar>
  );
}
