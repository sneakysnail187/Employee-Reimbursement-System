import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Sidebar,
    SidebarWrapper,
    SidebarTrigger,
    SidebarChildren,
    SidebarItem,
    SidebarContent
 } from '@/components/shared/sidebar'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  return( 
    <SidebarWrapper>
        <SidebarTrigger />
        <Sidebar children={undefined}>
    
        </Sidebar>
        <SidebarChildren>
            <Outlet />
        </SidebarChildren>
    </SidebarWrapper>

  )
}
