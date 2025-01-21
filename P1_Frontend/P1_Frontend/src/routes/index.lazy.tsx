import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { LoginForm } from "@/features/auth/components/login-form";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <h1 className="text-2xl font-bold mb-4">Employee Reimbursement System</h1>
      </div>
      <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your details to login.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <Toaster />
          </CardContent>

          <CardFooter>
            <p>Don't have an account?</p>
            <Link to={"/auth/register"} className="underline ml-2">
              Register
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
