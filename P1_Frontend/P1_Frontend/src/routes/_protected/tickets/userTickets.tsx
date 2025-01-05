import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tickets/userTickets')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/tickets/userTickets"!</div>
}
