import { Home, LucideIcon, User } from "lucide-react";

interface SidebarItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

interface SidebarGroup {
    name: string;
    items: SidebarItem[];
}


export const sidebarItems: SidebarGroup[] = [
    {
        name: "Home",
        items: [
            {
                name: "Home",
                href: "/tickets/allTickets",
                icon: Home,
            },
        ],
    },
    {
        name: "User List",
        items: [
            {
                name: "User List",
                href: "/user/allUsers",
                icon: User,
            },
        ],
    },
];