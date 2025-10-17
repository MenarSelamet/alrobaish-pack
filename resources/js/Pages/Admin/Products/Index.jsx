import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DashboardLayout from "@/Layouts/DashboardLayout";

const Index = () => {
    return (
        <AuthenticatedLayout>
            <DashboardLayout>
                <div>This is the products page</div>
            </DashboardLayout>
        </AuthenticatedLayout>
    );
};

export default Index;
