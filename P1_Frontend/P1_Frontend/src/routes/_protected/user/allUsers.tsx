import { createFileRoute } from '@tanstack/react-router'
import { UserList } from '@/features/auth/components/user-list'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const Route = createFileRoute('/_protected/user/allUsers')({
  component: RouteComponent,
})

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
