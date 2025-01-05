import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tickets/allTickets')({
  component: RouteComponent,
},)

function RouteComponent() {
  return( <div>Hello "/_protected/tickets/allTickets"!</div>)
}
