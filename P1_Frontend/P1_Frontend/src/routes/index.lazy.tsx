import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { LoginForm } from "@/features/auth/components/login-form";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

/**
 * The Index component is the main component for the login page. It renders a
 * centered card with a header, content, and footer. The header contains the
 * title of the page, the content contains a LoginForm component, and the footer
 * contains a link to register a new user.
 *
 * @returns {JSX.Element} The rendered component.
 */

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
