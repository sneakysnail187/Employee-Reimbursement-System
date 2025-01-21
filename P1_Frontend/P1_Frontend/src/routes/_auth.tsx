import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { useEffect } from 'react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
    //const { data: auth } = useAuth()
   // const router = useRouter()

   // useEffect(() => {
    //    if (auth) {
   //         router.navigate({ to: "/tickets/userTickets" })
   //     }
  //  }, [auth])

  return(   
        <div className = "flex justify-center items-center h-screen">
            <Outlet />
        </div>
  )
}

