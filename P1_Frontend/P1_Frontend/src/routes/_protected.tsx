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
 import { useCheckRole } from '@/features/auth/hooks/use-check-role'
 import { Navbar } from '@/components/shared/navbar'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
})

/**
 * RouteComponent is the main component for the protected routes. It renders a
 * basic layout with a navbar at the top and a sidebar on the left. The content
 * of the current route is rendered in the main area of the page.
 * 
 * If the user is not a manager, the sidebar is not displayed and the content
 * of the current route is rendered directly in the main area of the page.
 * 
 * @returns {JSX.Element} The rendered component.
 */
function RouteComponent() {
    const { data: auth } = useCheckRole();

    if(auth != "Manager") return (<div className="min-h-[200vh]"><Navbar /><Outlet /></div>)

    return( 
        <div className="min-h-[200vh]">
            <Navbar />
            <SidebarWrapper>
            <SidebarTrigger />
            <Sidebar>
                <SidebarContent>
                    {sidebarItems.map((group) => (
                        <SidebarGroup key={group.name}>
                            <SidebarLabel>{group.name}</SidebarLabel>
                            {group.items.map((item) => (
                                <SidebarItem key={item.name} name = {item.name} href={item.href} icon={item.icon} />
                            ))}
                        </SidebarGroup>
                    ))}
                </SidebarContent>
            </Sidebar>
            <SidebarChildren>
                <Outlet />
            </SidebarChildren>
            </SidebarWrapper>
        </div>

    )
}
