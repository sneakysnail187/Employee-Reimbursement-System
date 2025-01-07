

import { createFileRoute, Link } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TicketForm } from '@/features/auth/components/ticket-form'

export const Route = createFileRoute('/_protected/tickets/addTicket')({
  component: RouteComponent,
},
);

function RouteComponent() {
  return (
    <Card className="b-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Submit a Ticket</CardTitle>
        <CardDescription>Enter ticket details.</CardDescription>
      </CardHeader>
      <CardContent>
        <TicketForm open={false} setOpen={function (value: boolean): void {
          throw new Error('Function not implemented.');
        } } />
      </CardContent>

      <CardFooter>
        <p>Don't have an account?</p>
        <Link to={'/auth/register'} className="underline ml-2">
          Register
        </Link>
      </CardFooter>
    </Card>
  )
}
