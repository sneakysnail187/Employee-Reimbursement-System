import { createFileRoute, Outlet } from '@tanstack/react-router'
import { 
    Sidebar,
    SidebarGroup,
    SidebarLabel,
    SidebarWrapper,
    SidebarTrigger,
    SidebarChildren,
    SidebarItem,
    SidebarContent
 } from '@/components/shared/sidebar'
 import { sidebarItems } from '@/components/constants/sidebar-items'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

function RouteComponent() {
  return( 
    <SidebarWrapper>
        <SidebarTrigger />
        <Sidebar>
            <SidebarContent>
                {sidebarItems.map((group) => (
                    <SidebarGroup key={group.name}>
                        <SidebarLabel>{group.name}</SidebarLabel>
                        {group.items.map((item) => (
                            <SidebarItem key={item.name} href={item.href} icon={item.icon} />
                        ))}
                    </SidebarGroup>
                ))}
            </SidebarContent>
    
        </Sidebar>
        <SidebarChildren>
            <Outlet />
        </SidebarChildren>
    </SidebarWrapper>

  )
}
