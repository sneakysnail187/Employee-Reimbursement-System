import { createLazyFileRoute, Link } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { EditForm } from '@/features/auth/components/edit-form'

export const Route = createLazyFileRoute('/_auth/reimb/editTicket')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card className="b-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Submit a Ticket</CardTitle> // user info
        getter to help display different things
        <CardDescription>Enter ticket details.</CardDescription>
      </CardHeader>
      <CardContent>
        <EditForm />
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
