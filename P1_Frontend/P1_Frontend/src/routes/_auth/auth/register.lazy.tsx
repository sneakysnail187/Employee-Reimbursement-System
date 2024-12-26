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

function RouteComponent() {
  return (
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
        <Link to={"/auth/login"} className="underline ml-2">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
