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
