import { createLazyFileRoute, Link } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TicketForm } from "@/features/auth/components/ticket-form";

export const Route = createLazyFileRoute("/_protected/addTicket")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Card className="b-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Submit a Ticket</CardTitle>
        <CardDescription>
          Enter ticket details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TicketForm />
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
