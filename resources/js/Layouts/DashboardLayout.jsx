import { Link, usePage } from "@inertiajs/react";
import { LayoutDashboard, Package, FolderTree, Users } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "../Components/Sidebar";

export default function DashboardLayout({ children }) {
    const { url } = usePage();

    const menuItems = [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Categories",
            url: "/admin/dashboard/categories",
            icon: FolderTree,
        },
        {
            title: "Products",
            url: "/admin/dashboard/products",
            icon: Package,
        },
        { title: "Users", url: "/admin/dashboard/users", icon: Users },
    ];

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full">
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {menuItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={url === item.url}
                                            >
                                                <Link href={item.url}>
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                <div className="flex-1 flex flex-col">
                    <SidebarTrigger />

                    <main className="flex-1 p-6 bg-background">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
}
