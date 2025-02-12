import { createFileRoute } from '@tanstack/react-router'
import { TicketList } from '@/features/auth/components/ticket-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { TicketForm } from '@/features/auth/components/ticket-form'
import { EditForm } from '@/features/auth/components/edit-form'

export const Route = createFileRoute('/_protected/tickets/userTickets')({
  component: RouteComponent,
})

/**
 * Component for the userTickets route.
 *
 * This component renders a centered card with three buttons (Create Ticket, Edit Ticket, Logout) and a TicketList component.
 * When the Create Ticket button is clicked, it opens the TicketForm component.
 * When the Edit Ticket button is clicked, it opens the EditForm component.
 * When the Logout button is clicked, it logs the user out and redirects them to the login page.
 *
 * @returns {JSX.Element} The react component.
 */
function RouteComponent() {
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  return( 
    <div>
      <div className="flex flex-row m-3 gap-x-5">
        <Button className="w-fit" onClick={() => setCreateOpen(true)}>
          <Plus />
          Create Ticket
        </Button>
        <Button className="w-fit" onClick={() => setEditOpen(true)}>
          Edit Ticket
        </Button>
      </div>

      <TicketForm open={createOpen} setOpen={setCreateOpen} />
      <EditForm open={editOpen} setOpen={setEditOpen} />

      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <TicketList />
      </div>
    </div>
  )
}
