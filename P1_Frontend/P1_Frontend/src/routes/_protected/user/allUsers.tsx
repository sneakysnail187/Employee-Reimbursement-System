import { createFileRoute } from '@tanstack/react-router'
import { UserList } from '@/features/auth/components/user-list'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const Route = createFileRoute('/_protected/user/allUsers')({
  component: RouteComponent,
})

/**
 * Component for the allUsers route.
 *
 * This component renders a centered card with three buttons (Create Ticket, Edit Ticket, Logout) and a TicketList component.
 * When the Create Ticket button is clicked, it opens the TicketForm component.
 * When the Edit Ticket button is clicked, it opens the EditForm component.
 * When the Logout button is clicked, it logs the user out and redirects them to the login page.
 *
 * @returns {JSX.Element} The react component.
 */
function RouteComponent() {
  const [open, setOpen] = useState(false)

  return( 
    <div>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <UserList />
      </div>
    </div>
  )
}
