import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/card";
import { Package, FolderTree, Users, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
    const { t } = useTranslation();
    const stats = [
        {
            title: t("dashboard.stats_total_products"),
            value: "24",
            icon: Package,
            color: "text-primary",
        },
        {
            title: t("dashboard.stats_categories"),
            value: "3",
            icon: FolderTree,
            color: "text-accent",
        },
        {
            title: t("dashboard.stats_users"),
            value: "156",
            icon: Users,
            color: "text-secondary",
        },
        {
            title: t("dashboard.stats_orders"),
            value: "10,234",
            icon: ShoppingBag,
            color: "text-primary",
        },
    ];
    return (
        <DashboardLayout>
            <div className="m-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                    {t("dashboard.overview")}
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
    );
}
