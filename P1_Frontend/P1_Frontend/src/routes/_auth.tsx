import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { useEffect } from 'react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

/**
 * Component for the _auth route.
 *
 * This component serves as a wrapper for the authentication routes,
 * centering its contents vertically and horizontally on the screen.
 * It renders an Outlet component to display any child routes.
 *
 * @returns {JSX.Element} The react component.
 */

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

