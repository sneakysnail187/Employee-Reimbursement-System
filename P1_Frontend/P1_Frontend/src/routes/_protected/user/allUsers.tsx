import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/user/allUsers')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>allUsers</div>
}
