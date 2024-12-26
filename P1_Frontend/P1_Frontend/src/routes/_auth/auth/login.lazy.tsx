import { createLazyFileRoute, Link } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/login-form";

export const Route = createLazyFileRoute("/_auth/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your details to login.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>

      <CardFooter>
        <p>Don't have an account?</p>
        <Link to={"/auth/register"} className="underline ml-2">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
