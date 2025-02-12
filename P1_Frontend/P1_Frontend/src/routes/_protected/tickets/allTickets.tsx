import { createFileRoute } from '@tanstack/react-router'
import { AllTicketList } from '@/features/auth/components/all-ticket-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { TicketForm } from '@/features/auth/components/ticket-form'

export const Route = createFileRoute('/_protected/tickets/allTickets')({
  component: RouteComponent,
},)

  /**
   * The RouteComponent is a React component that renders the allTickets page.
   * The page displays a list of all tickets in the system, and provides a button
   * to create a new ticket. The component also renders a modal for creating a
   * new ticket, and handles the state for that modal.
   *
   * @returns {JSX.Element} The rendered component.
   */
function RouteComponent() {
  const [open, setOpen] = useState(false)
  
  return( 
    <div>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button className="w-fit" onClick={() => setOpen(true)}>
          <Plus />
          Create Ticket
        </Button>
      </div>

      <TicketForm open={open} setOpen={setOpen} />

      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <AllTicketList />
      </div>
    </div>
  )
}