import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../Components/Card";
import { Package, FolderTree, Users, ShoppingBag } from "lucide-react";

export default function Dashboard() {
    const stats = [
        {
            title: "Total Products",
            value: "24",
            icon: Package,
            color: "text-primary",
        },
        {
            title: "Categories",
            value: "3",
            icon: FolderTree,
            color: "text-accent",
        },
        { title: "Users", value: "156", icon: Users, color: "text-secondary" },
        {
            title: "Orders",
            value: "10,234",
            icon: ShoppingBag,
            color: "text-primary",
        },
    ];
    return (
        <AuthenticatedLayout>
            <DashboardLayout>
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                        Dashboard Overview
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat) => (
                            <Card key={stat.title}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </CardTitle>
                                    <stat.icon
                                        className={`h-5 w-5 ${stat.color}`}
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-foreground">
                                        {stat.value}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </DashboardLayout>
        </AuthenticatedLayout>
    );
}
