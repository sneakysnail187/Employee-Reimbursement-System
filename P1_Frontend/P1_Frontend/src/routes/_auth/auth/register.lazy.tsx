import { RegisterForm } from "../../../features/auth/components/register-form";

import { createLazyFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createLazyFileRoute("/_auth/auth/register")({
  component: RouteComponent,
});

/**
 * Component for the register route.
 *
 * This component renders a centered card with a RegisterForm inside of it.
 * It also renders a footer with a link to the login route.
 * 
 * @returns {JSX.Element} The react component.
 */
function RouteComponent() {
  return (
    <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your details to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>

        <CardFooter>
          <p>Already have an account?</p>
          <Link to={"/"} className="underline ml-2">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
